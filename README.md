# Getting Started

## Introducing and what is the objective

This is "Project Birdnest" where is needed to monitor no drone zone (NDZ) 

Build and deploy a web application which lists all the pilots who recently violated the NDZ perimeter.

What it looks like is up to you, but this list should

Persist the pilot information for 10 minutes since their drone was last seen by the equipment
Display the closest confirmed distance to the nest
Contain the pilot name, email address and phone number
Immediately show the information from the last 10 minutes to anyone opening the application
Not require the user to manually refresh the view to see up-to-date information


# How to start

This public project works at NextJS with TypeScript supporting.

You have next ones way how to run this application:
- You can see directly and now how this application works at: 
  - Or at [Project Birdnest at custom my instance](http://34.23.45.250/). It is my custom instance at `google.cloud` where is running dicker container with this project. That is a better way to see how this application works.
  - Or at [Project Birdnest at Vercel](https://project-birdnest.vercel.app/). It is subdomain of `vercel` company ([https://vercel.com](https://vercel.com/) , which provides and supports NextJS). The application was deployed at this subdomain too.
- Please create new folder at your local machine. Go inside it and run next command `git clone https://github.com/alari777/project-birdnest.git .`
Be sure that you have `nodejs` and `npm`. Link: `https://nodejs.org/en/`. Better way to take `nvm` tool, link: . 
Next complete `npm ci`. In order to start this application in dev mode then type `npm run dev`, this application will start
on [http://localhost:3000](http://localhost:3000) . In order to build application complete please `npm build` and then `npm run` .
- Using `Docker`. For this one you need to install Docker at your machine (server). Link: . Then lets go on `https://github.com/alari777/project-birdnest/pkgs/container/project-birdnest%2Fproject-birdnest` and copy please 
`docker pull ghcr.io/alari777/project-birdnest/project-birdnest:latest`. Then:
```bash
# to pull latest docker image of this project
sudo docker pull ghcr.io/alari777/project-birdnest/project-birdnest:latest

# to see docker images
sudo docker images

# to start docker container based on this image 
# map port 3000 in the container to port 80 on the Docker host
# name of container `bird`
# "-d" flag causes Docker to start the container in "detached" mode
sudo docker run -p 80:3000 -d --name bird ghcr.io/alari777/project-birdnest/project-birdnest:latest

# to see running containers
sudo docker ps

# to see logs (for example last 300 log-records) in real time for this container called `bird`
sudo docker logs --tail 300 -f bird
```

# Tests
To start tests: `npm run test`
![Image alt](./screenshots/readme/tests/tests.PNG)

To start coverage of tests: `npm run test:coverage`
![Image alt](./screenshots/readme/tests/tests-coverage.PNG)

# GitHub actions
After creating `pull request` this project runs two GitHub actions: `run_tests` and `push_docker`.
You can find them in folder `.github/workflows/`.

- Action `run_tests` runs tests.
- Action `push_docker` creates Docker image of this project and pushes it in GitHub package.
This action depends on `run_tests`

# How it works

## Diagramma

## Structure of project

# Sprints
