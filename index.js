import axios from 'axios';

const getData = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events`);
        const event = response.data;

        if(event.length() === 0) {
            console.log("No recent activity found");
        }

       event.forEach(event => {
            let message = "";
            switch (event.type) {
                case "PushEvent":
                    message = `Pushed ${event.payload.commits.length} commit(s) to ${event.repo.name}`;
                    break;
                case "IssuesEvent":
                    message = `Opened a new issue in ${event.repo.name}`;
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
                    message = `Opened a pull request in ${event.repo.name}`;
                    break;
                default:
                    message = `Performed ${event.type} in ${event.repo.name}`;
            }
            console.log(message);
       });




    } catch (error) {
        console.error("Error getting user data:", error.message);
    }
}

getData('AUSTIN0022');
