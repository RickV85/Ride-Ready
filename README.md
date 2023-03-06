<div align="center">

<img src="https://user-images.githubusercontent.com/113261334/221386582-8a049597-9571-49ce-b800-ce30b7f3bd69.png" width="120" height="120">
  
# Ride Ready
  

</div>

  <p align="center">
    <a href="https://github.com/RickV85/Ride-Ready/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/RickV85/Ride-Ready/issues">Report Bug</a>
    ·
    <a href="https://github.com/RickV85/Ride-Ready/issues">Request Feature</a>
  </p>

</div>

<div align="center">

## Table of Contents

[Abstract](#abstract) ~
[Installation Instructions](#installation-instructions) ~
[Deployed Link](#deployed-link) ~
[Preview of App](#preview-of-app) ~
[Technologies](#technologies)

</div>

<div align="center">

## Abstract:

[//]: <> (Briefly describe what you built and its features. What problem is the app solving? How does this application solve that problem?)

This app was inspired by a real word need of every avid mountain biker. If you are serious about mountain biking, you need to take maintenance seriously too. Keep your ride as "Ride Ready" as possible with this app! It not only serves as a reminder of when you last performed a suspension rebuild, but it also gives you an exact level of service life left since your last rebuild based on specific recommendations by each suspension manufacturer.

Ride Ready leverages a user's ride data on Strava to help them determine when their suspension needs to be rebuilt. The user logs in with Strava's OAuth2.0 authentication which grants Ride Ready access to all of their activity data and then it filters the data to only include bike rides. The app also fetches all bike data ("My Gear" in Strava settings) so that the user can specify which bike they want to create a service reminder for and then only uses ride data on that bike for the service life calculation. 

Built in 6 days for a Turing School of Software Mod 3 Showcase project. This requires a Strava account and ride data to operate.
  
</div>

---

## Installation Instructions:

[//]: <> (What steps does a person have to take to get your app cloned down and running?)

1. Fork the Repo from the [Repository](https://github.com/RickV85/Ride-Ready)
2. Clone the repo
   ```sh
   git clone git@github.com:RickV85/Ride-Ready.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run npm start
   ```sh
   npm start
   ```
5. Use the Link that is given in the Terminal & Open in Browser
   ```sh
   Example: http://localhost:3000/
   ```

---
  
## Deployed Link

[Click here to view deployed app on Vercel](https://ride-ready.vercel.app/)

---

## Preview of App:
[//]: <> (Provide ONE gif or screenshot of your application - choose the "coolest" piece of functionality to show off.)




  

---

## Technologies

<div>
  <img src="https://img.shields.io/badge/-react-333333?logo=react&style=for-the-badge" width="100" height="30"/>
  <img src="https://img.shields.io/badge/-redux-593d88?logo=redux&style=for-the-badge" width="100" height="30"/>  
  <img src="https://img.shields.io/badge/-react%20router-f44250?logo=react%20router&logoColor=white&style=for-the-badge" width="140" height="30"/>
  <img src="https://img.shields.io/badge/-cypress-007780?logo=cypress&logoColor=white&style=for-the-badge" width="100" height="30"/>
  <img src="https://img.shields.io/badge/-CSS3-315780?logo=css3&style=for-the-badge" width="100" height="30"/>
  <img src="https://img.shields.io/badge/-sass-c69?logo=sass&logoColor=white&style=for-the-badge" width="100" height="30"/>  
  <img src="https://img.shields.io/badge/-npm-c12127?logo=npm&logoColor=white&style=for-the-badge" width="80"  height="30"/>
</div>

---

## Contributors:
  
  <img src="https://img.shields.io/badge/-Rick%20Vermeil-3a5311" height="30" width="100">
  <p><strong>Connect with:</strong></p>
  <a href="https://www.linkedin.com/in/rick-vermeil-b93581159/"> 
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
  <a href="https://github.com/RickV85">
    <img src="https://img.shields.io/badge/-github-black?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Badge">
  </a>
  <a href="mailto: rickv85@gmail.com">
    <img src="https://img.shields.io/badge/-gmail-red?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail Badge">
  </a>
</div>
