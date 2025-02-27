import axios from 'axios';

// Get username from command line arguments
const args = process.argv.slice(2);
const username = args[0];

// Display usage information if no username is provided
if (!username) {
  console.log('Usage: github-activity <username>');
  process.exit(1);
}

const getData = async (username) => {
  try {
    
    console.log(`\nFetching activity for GitHub user: ${username}...`);
    
    const response = await axios.get(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Activity-CLI'
        }
      }
    );
    
    const events = response.data;

    if (events.length === 0) {
      console.log("\nNo recent activity found for this user.");
      return;
    }

    // Display a count of total events found
    console.log(`\nFound ${events.length} recent activities:\n`);

    // Format the data for console.table
    const tableData = events.map(event => {
      let action = "";
      
      switch (event.type) {
        case "PushEvent":
          action = `Pushed ${event.payload.commits?.length || 0} commit(s)`;
          break;
        case "IssuesEvent":
          action = `${event.payload.action} an issue`;
          break;
        case "WatchEvent":
          action = `Starred repository`;
          break;
        case "ForkEvent":
          action = `Forked repository`;
          break;
        case "CreateEvent":
          action = `Created a new ${event.payload.ref_type}`;
          break;
        case "PullRequestEvent":
          action = `${event.payload.action} a pull request`;
          break;
        case "DeleteEvent":
          action = `Deleted a ${event.payload.ref_type}`;
          break;
        case "IssueCommentEvent":
          action = `Commented on an issue`;
          break;
        case "ReleaseEvent":
          action = `Published a new release`;
          break;
        default:
          action = `Performed ${event.type}`;
      }

      return {
        Date: new Date(event.created_at).toLocaleString(),
        Type: event.type,
        Action: action,
        Repository: event.repo.name
      };
    });

    // Display the data in table format
    console.table(tableData);

  } catch (error) {
    // Improved error handling with more specific messages
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      if (error.response.status === 404) {
        console.error(`Error: User '${username}' not found.`);
      } else if (error.response.status === 403) {
        console.error('Error: Rate limit exceeded. Please try again later.');
      } else {
        console.error(`Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error: No response received from GitHub. Check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
};

// Execute the function
getData(username);