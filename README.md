# PlanB - Events
testing hola
<br>

## Description

PlanB Events. is an app for connecting users looking for a plan with the activities available in the vibrant city of Barcelona. 
Users can browse by their preferred category, date and have a look at the locations, see what’s closer to them, and finally join the events!

## User Stories

-  **Signup:** 
-  **Login:** 
-  **Logout:** 
-  **Create Event**
-  **Delete Event** 
-  **Join events** 
-  **Become host of an Event** 
-  **Edit or Delete your Space** 

## Backlog

- Past events info & Carrousel at homepage
- Filter button by date for the events
- Add individual map to every event's details
- Select the space directly as a dropdown option in the Creating Event feature
- Surprise location event! Users don’t get the event’s location until 24h before the event
- Receive suggestions and notifications based on your profile (users choose a category interesting for them and receive notifications of the new available events).


<br>

# Client / Frontend
## React Router Routes (React App)

| **URL**               | **Component**       | **Permissions** | **Behavior**                      |
|-----------------------|---------------------|-----------------|-----------------------------------|
|     "/"               | HomePage            | Public          | Home Page                         |    
|     "/auth"           | AuthPage            | Anon Only       | Signup / LogIn                    |
|   "/events"           | EventsMainPage      | Public          | Categories of events & Filter Form|
|"/events/category-list"| EventsListPage      | Public          | Categories Filtered &    ""       |    
|     "/events/:id"     | EventsDetailPage    | Public          | Event Details, if token->joinButton|
|   "/profile"          | ProfilePage         | User Only       | User details, Joined events, Become Host, Create Event, Edit user |
| "/events/create"      | EventCreatePage     | User Only       | List of spaces & create form      |
|  "/profile/myspace"   | MySpacePage         | User Only       | Create space form, details, delete|
|   "/events/map"       | EventsMapPage       | Public          | Map with all events locations     |
|"/events/random"       | EventsDetailPage    | Public          | Details of a random event         |    


----------------

<br>

## Components

- Loading
- IsPrivate
- Navbar
- BackButton
- more...


## Services

- Auth Service
  - authService.login(requestBody)
  - authService.signup(requestBody)
  - authService.verify(storedToken)

- Events Service
  -  eventsService.createEvent 
  -  eventsService.getSelectedEvents 
  -  eventsService.getAllEvents 
  -  eventsService.getRandomEvent 
  -  eventsService.deleteEvent
  
- Users Service 
  - userService.editUser(id, requestBody)
  - userService.getUser(id) 
  - userService.joinEvent(userId, eventId)
  - userService.leaveEvent(userId, eventId)

- Spaces Service
  - spacesServices.createSpace(requestBody)
  - spacesServices.getAllSpaces()
  - spacesServices.getSpace(id)
  - spacesServices.deleteSpace(spaceId, ownerId)

<br>

# Server / Backend


## Models

User model

```javascript
{
    username: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImg: {type: String, default: "https://cdn-icons-png.flaticon.com/512/456/456212.png"},
    space: {type: Schema.Types.ObjectId, ref: 'Space'},
    joinedEvents: [{type: Schema.Types.ObjectId, ref: 'Event', default: []}],
    createdEvents: [{type: Schema.Types.ObjectId, ref: 'Event', default: []}]
}
```



Event model

```javascript
{
    producer: { type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    imgUrl: {type: String, required: true},
    description: String,
    date: {type: Date, required: true},
    time: {type: String, required: true},
    duration: {type: Number, default: 1},
    location: {type: Schema.Types.ObjectId, ref: 'Space', required: true},
},
{
    timestamps: true,
}
```



Space model

```javascript
{
    owner: { type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    imgUrl: {type: String, required: true},
    description: String,
    availableDates: [{type: Date, min: 1, required: true}],
    availableHours: [{type: String, min: 1, required: true}],
    capacity: {type: Number, required: true},
    address: {
        street: String,
        stNumber: String,
        postcode: Number
    },
    allowedPets: false,
    allowedBeverages: false,
    covidTest: false,
    wheelchairAccess: false
}
```

<br>

## API Endpoints (backend routes)

| **URL**               | **Method**       | **Req.body**               | **Description**       |
|-----------------------|---------------------|-----------------|-----------------------------------|
|     "/api/auth/signup"    |      POST        | {username, email, password}|Check if the fields not empty, create user with encrypt psw and store user session|    
|     "/api/auth/login"     |      POST        |    {email, password}       |Check if fields not empty, if user exist & pwd matches, then store user session|
|   "/api/auth/verify"      |      GET         |        (empty)             |Recives decrypted token from server & returns payload|
|"/api/events/pastevents"|     GET         |        (empty)             |Show all past events   |    
|"/api/events/futureevents"|   GET         |        (empty)             |Show only all future events |
|"/api/events/random"   |      GET         |        (empty)             |Show a random event    |
|   "/api/events/:id"   |      GET         |         {id}               |Show a specific event with details|    
|   "/api/events/:id"   |      PUT         |{space/host, id, name, img, category, description, date, time}| Edit an event |
|     "/api/events/:id" |      DELETE      |         {id}               |Delete an event |    
|   "/api/events"       |      POST        |{space/host, id, name, img, category, description, date, time}|Create an event  |
| "/api/user/:id"       |     GET          |        {id}                | Show a specific user  |    
| "/api/user/:id"       |     PUT          |{id, username, img, events, myspace}|Edit a user    |    
| "/api/user/:id"       |    DELETE        |        {id}                |Delete a user          |
| "/api/spaces"   |     GET          |        (empty)             |Show a list of spaces  |    
|"/api/spaces/:id"|    GET          |        {id}               |Shows a list of spaces |    
|"/api/spaces/"|    POST         |{img, name, capacity, location}|Create a new space  |
|"/api/spaces/:id"|    PUT          |{img, name, capacity, location}|Edit a specific space|
|"/api/spaces/:id"|    DELETE       |        {id}                |Delete an space        |


----------------

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/dPLlhF2h/project-3-planb) 


### Git

The url to your repository and to your deployed project

[repository Link](https://github.com/PlanB-Events/PlanB)

[Deployed App Link](https://pbevents-fan.herokuapp.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
