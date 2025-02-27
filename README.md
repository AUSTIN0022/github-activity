# GitHub User Activity CLI

A simple command-line interface tool that fetches and displays the recent activity of a GitHub user.

Sample solution for the [GitHub User Activity](https://roadmap.sh/projects/github-user-activity) challenge from [roadmap.sh](https://roadmap.sh/)

## Overview

GitHub User Activity CLI is a lightweight tool that allows you to check a GitHub user's recent activities directly from your terminal. It provides a clean, tabular view of events such as commits, pull requests, issues, repository stars, and more.

## Features

- Fetch a user's recent GitHub activity using the GitHub API
- Display activities in a well-formatted table in the terminal
- Show activity types, actions, repositories, and timestamps
- Graceful error handling for invalid usernames or API failures
- No external dependencies for API interaction

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Setup

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/github-activity-cli.git
   cd github-activity-cli
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Make the script executable:
   ```
   chmod +x index.js
   ```

4. Optionally, link the package globally:
   ```
   npm link
   ```

## Usage

Basic usage:

```
github-activity <username>
```

Example:

```
github-activity kamranahmedse
```

This will display a table with the recent GitHub activities of the user "kamranahmedse".

## Output Example

```
Fetching activity for GitHub user: kamranahmedse...
Found 30 recent activities:

┌─────────┬─────────────────────────┬──────────────────┬────────────────────────┬──────────────────────────────────┐
│ (index) │          Date           │       Type       │         Action         │           Repository             │
├─────────┼─────────────────────────┼──────────────────┼────────────────────────┼──────────────────────────────────┤
│    0    │ '2/27/2025, 3:42:05 PM' │    'PushEvent'   │ 'Pushed 3 commit(s)'   │ 'kamranahmedse/developer-roadmap'│
│    1    │ '2/27/2025, 2:10:18 PM' │   'IssuesEvent'  │ 'opened an issue'      │ 'kamranahmedse/developer-roadmap'│
│    2    │ '2/27/2025, 1:05:30 PM' │   'WatchEvent'   │ 'Starred repository'   │ 'kamranahmedse/developer-roadmap'│
│    3    │ '2/26/2025, 11:22:45 AM'│ 'PullRequestEvent'│ 'opened a pull request'│ 'kamranahmedse/developer-roadmap'│
└─────────┴─────────────────────────┴──────────────────┴────────────────────────┴──────────────────────────────────┘
```

## Error Handling

The CLI handles various error scenarios:

- If the username doesn't exist: `Error: User 'nonexistentuser' not found.`
- If rate limit is exceeded: `Error: Rate limit exceeded. Please try again later.`
- If there's a network issue: `Error: No response received from GitHub. Check your internet connection.`

## Technical Details

This project uses:
- Pure JavaScript with Node.js
- Axios for HTTP requests
- GitHub API v3
- Console.table for formatted output

## API Endpoints Used

The application uses the GitHub Events API:

```
https://api.github.com/users/<username>/events
```

## Limitations

- The GitHub API limits requests to 60 per hour for unauthenticated requests
- Only the most recent 30 events are returned by default

## Future Enhancements

- Add authentication support to increase rate limits
- Implement pagination for viewing more than 30 events
- Add filtering options (by date range, event type, etc.)
- Add colorized output for better readability
- Support for organization activities

## License

MIT License

## Author
Austin Makasare