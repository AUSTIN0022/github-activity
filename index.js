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
    // Add error handling for network requests
    console.log(`Fetching activity for GitHub user: ${username}...`);
    
    const response = await axios.get(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Consider adding a User-Agent header to be more respectful to GitHub API
          'User-Agent': 'GitHub-Activity-CLI'
        }
      }
    );
    
    const events = response.data;

    if (events.length === 0) {
      console.log("No recent activity found for this user.");
      return;
    }

    // Display a count of total events found
    console.log(`Found ${events.length} recent activities:\n`);

    events.forEach(event => {
      let message = "";
      const date = new Date(event.created_at).toLocaleString();
      
      switch (event.type) {
        case "PushEvent":
          message = `Pushed ${event.payload.commits?.length || 0} commit(s) to ${event.repo.name}`;
          break;
        case "IssuesEvent":
          message = `${event.payload.action} an issue in ${event.repo.name}`;
          break;
        case "WatchEvent":
          message = `Starred ${event.repo.name}`;
          break;
        case "ForkEvent":
          message = `Forked ${event.repo.name}`;
          break;
        case "CreateEvent":
          message = `Created a new ${event.payload.ref_type} in ${event.repo.name}`;
          break;
        case "PullRequestEvent":
          message = `${event.payload.action} a pull request in ${event.repo.name}`;
          break;
        case "DeleteEvent":
          message = `Deleted a ${event.payload.ref_type} in ${event.repo.name}`;
          break;
        case "IssueCommentEvent":
          message = `Commented on an issue in ${event.repo.name}`;
          break;
        case "ReleaseEvent":
          message = `Published a new release in ${event.repo.name}`;
          break;
        default:
          message = `Performed ${event.type} in ${event.repo.name}`;
      }
      console.log(`- ${message} (${date})`);
    });

  } catch (error) {
    // Improved error handling with more specific messages
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
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