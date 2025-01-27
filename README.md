#GameCupid

**Use your love of video games as a way to meet new people**
## Discover Your Player Two with GameCupid

GameCupid is the ultimate dating app designed specifically for gamers! Harness your passion for video games to connect with like-minded individuals and build meaningful relationships. Whether you're into RPGs, FPS, or casual games, GameCupid helps you find your perfect match based on your gaming preferences.

### Why Choose GameCupid?

- **Tailored Matches**: Our algorithm matches you with others who share your love for the same genres and platforms.
- **Comprehensive Profiles**: Create a detailed profile with your favorite games, gaming platforms, and personal interests.
- **Community of Gamers**: Join a vibrant community where you can meet new friends and potential partners who understand your gaming lifestyle.

### How It Works

1. **Create Your Profile**: Sign up and fill out your profile with your name, email, gender, location, gaming platforms, and top 5 video games.
2. **Find Matches**: Browse through profiles of other gamers and find those who match your interests and preferences.
3. **Connect**: Start interacting with your matches and get to know them better through our platform.

Join GameCupid today and level up your love life by finding your Player Two!

## User Stories

### MVP

- **As a guest** view a welcome page.
- **AAG** register for a profile.
- **As a user**, set profile with name, email, gender, location, video game platforms (PC, Nintendo, etc.) with user accounts for platforms, top 5 video games.
- **AAU** be able to edit my information as my taste change.
- **AAU** want to see other profiles that match with me.
- **AAU** want to be able to delete my profile.

### Stretch Goals

- **AAU** want to be able to message other users directly.
- **AAU** be able to add pictures to my profile.
- **AAU** be able to link to gamer tag pages (offsite)
- **AAU** be able to upload my own picture

## Wireframe


#### Sign In
![Signin](/public/image/signin.jpg)

#### Sign Up
![SignUp](/public/image/signup.jpg)

#### Welcome Page
![WelcomePage](/public/image/welcome.jpg)

#### Profile
![Profile](/public/image/user-profile.jpg)

#### Edit
![Edit-Profile](/public/image/edit-profile.jpg)
![Edit-Platform](/public/image/edit-platform.jpg)
![Edit-Games](/public/image/edit-games.jpg)

#### Matches
![Matches](/public/image/match-profile.jpg)

#### Likes
![Likes](/public/image/like.jpg)


## ERD
![Erd-Diagram](/public/image/ERD.png)

## Components Diagram
![Components-Diagram](/public/image/component%20Diagram.png)

## Routing Table
| Name             | Route                   | Use                     | Method       |
|------------------|-------------------------|-------------------------|--------------|
| Create User      | users/register          | create a user           | POST         |
| Login User       | users/login             | log in user             | POST         |
| Verify User      | users/token/refresh     | verify user             | GET          |
| Delete User      | users/:user_id          | delete user             | DELETE       |
| View Profile     | profile/                | view own profile        | GET          |
| View Other Profile| profile/:profile_id/   | view other profile      | GET          |
| Edit Profile     | profile/:profile_id/edit/| edit profile           | PUT          |
| View Profile Games| profile/games          | view profile games      | GET          |
| Edit Profile Games| profile/games/:pk/edit | edit favorite games     | PUT/DELETE   |
| Platform Choice View| profile/platforms/choices/| view platform choices| GET        |
| Platform Create   | profile/platforms/:profile_id| add profile platform | POST      |
| Edit Profile Platforms| profile/platform/:platform_id/edit | edit platforms | PUT/DELETE |
| Search for Matches | profile/match/search/ | run match algorithm     | GET          |
| View Matches     | profile/match/:match_id | view matched profiles   | GET          |
| Like Profile     | profile/match/add       | like profile            | POST         |
| Create Block     | matches/block/add       | block profile           | POST         |
| Get Blocks       |profile/block/:block_id  | get block detail/delete | GET/DELETE   |

## Project Mangement
[GameCupid Trello Board](https://trello.com/b/JT44Zi2F/gamecupid)

## GameCupid Front End Deployment
[GameCupid Front End Deployment](https://gamecupid.netlify.app/)

## GameCupd Back End Deployment
[GameCupid Back End Deployment](https://gamecupid-fc48081a5cff.herokuapp.com/)

## Tech Used

The following technologies were used to build the front end of GameCupid:

- **axios**: For making HTTP requests to the backend.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: Provides DOM-specific methods that can be used at the top level of a web app.
- **react-icons**: For including popular icons in the project.
- **react-router**: Declarative routing for React.
- **react-router-dom**: DOM bindings for React Router.
- **react-sortablejs**: A React component for sortable lists.
- **tailwindcss-textshadow**: A Tailwind CSS plugin for adding text shadows.

These technologies were chosen to create a responsive, interactive, and user-friendly interface for GameCupid.