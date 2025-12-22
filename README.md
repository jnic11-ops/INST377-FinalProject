# INST377-FinalProject
By Jacob Nicholson & Isai Amaya-Diaz

# Link to our site!
## https://inst-377-final-project-amber.vercel.app/INST377_final_homepage.html

## Description of your project:
The UMD Activity Finder helps students find activities based on their mood, time, group size, and personal preferences. This application will bring students together, promote engagement on campus, and help students discover the endless possibilities to overcome boredom.

## Description of target browsers (iOS? Android? Which ones?)
Our target browsers are mainly Safari and Google desktop browsers. At the current moment, our application is not optimized for mobile browsers; therefore, desktop is the main focus.


# Developers Manual 


## Audience: 
This document is intended for future developers who will extend or maintain the TerpTime application/website. Developers are expected to have prior knowledge in HTML, CSS, JavaScript, API's, Node.js, and database usage.


## Project Overview: 
TerpTime is a front-end application/website that helps UMD students discover activities based on their budget, mood, and time. The website implements external API's, JavaScript Libraries,  and a Supabase Database that allows users to generate, filter, and save activities, as well as view analytics based on their saved activities.


## Website Installation:

Ensure that you are using Chrome, Safari, or Edge. Node.js is required to run the application. A Supabase database account is required to make the website function.


## Clone the Repository:


git clone <git@github.com:jnic11-ops/INST377-FinalProject.git>


## Supabase Database Setup:
1. Log into Supabase account and create a new project.
2. Inside Supabase dashboard, create table named savedActivity.

| Column Name  | Type      | Description                              |
| ------------ | --------- | ---------------------------------------- |
| id           | uuid      | Primary key, default `gen_random_uuid()` |
| user_id      | text      | Anonymous user identifier                |
| activity_key | text      | Unique key from the Bored API            |
| activity     | text      | Activity description                     |
| type         | text      | Activity category                        |
| participants | integer   | Number of participants                   |
| price        | numeric   | Cost value (0–1)                         |
| duration     | text      | Estimated time                           |
| created_at   | timestamp | Defaults to `now()`                      |

3. Copy Supabase Project URL and Key and create a .env file in which you assign each one.

## Running the Application:
1. Navigate to the backend directory
2. Install dependencies
   - @supabase/supabase-js
   - body-parser
   - dotenv
   - express
   - nodemon
3. Start server

## Deployment: 
The application is deployed using Vercel.
### Steps
1. Ensure the latest code is pushed to the linked GitHub.
2. Connect Vercel to GitHub repository.
3. Deploy project.


## API Documentation:

### Bored API

This API is used to generate random activities and search filtered activities on the TerpTime homepage.
- Has filtered searches by type, price, and participants
- Random activity generator


### Movie Recommender API(Added towards the end based on user feedback)
-Fetches movie genres based on the user's input
-Returns movie recommendations based on what the user chooses


## Supabase Implementation:

GET - Retrieves Saved Activities
Gets saved activities from the SupaBase database and displays them on the TerpFlow page.

- Saved activity list
- Chart.js

POST - Saved Activity

Saves a selected activity to the Supabase database when the user clicks the "Save Activity" button.

- Home Page
- Toastify Notification

## Run Tests:

This project does not include tests. The functionality of the website was tested manually to see if the API worked in the browser. We also ensured the UI updated every time we made fetch calls.

Manual test methods:
- Verified API responses in the browser
- Ensure UI updates after fetch
- Confirmed saved activities stayed on the page after reload

## Application Roadmap:

In the future we want to implement:

- User authentication (UMD Student credentials)
- Add more options to the filter section
- Implement automated testing
- Add more visuals to the app to make the user more attracted to it

















