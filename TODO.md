# Todo List

## Phase 1: Project Setup
- [x] Initialize project repositories and folder structure
- [x] Set up version control (Git)

## Phase 2: Backend Development
- [ ] Set up backend Express server
	- [x] Initialize Node.js project and install dependencies (express, mongoose, cors, dotenv, etc.)
	- [x] Configure environment variables
	- [x] Set up basic Express server structure (app.js)
- [ ] Design MongoDB lead schema
	- [ ] Define Lead model (name, email, source, status, notes, timestamps)
	- [ ] Create Mongoose schema and model file
- [ ] Implement lead API endpoints
	- [ ] Create endpoint to add new lead
	- [ ] Create endpoint to get all leads
	- [ ] Create endpoint to update lead status
	- [ ] Create endpoint to add follow-up notes
	- [ ] Add authentication middleware for admin routes

## Phase 3: Frontend Development
- [ ] Set up React frontend app
	- [ ] Initialize React app (with Create React App or Vite)
	- [ ] Install dependencies (axios, react-router-dom, etc.)
	- [ ] Set up folder structure (components, pages, services)
- [ ] Create lead listing UI
	- [ ] Build table/list to display leads (name, email, source, status)
	- [ ] Add search and filter functionality (optional)
- [ ] Implement lead status update feature
	- [ ] Add UI controls to change lead status
	- [ ] Connect to backend API for status updates
- [ ] Add follow-up notes functionality
	- [ ] UI for adding/viewing notes per lead
	- [ ] Connect to backend API for notes
- [ ] Implement secure admin login
	- [ ] Build login page and authentication flow
	- [ ] Store and manage auth token/session
	- [ ] Protect admin routes/pages

## Phase 4: Integration & Testing
- [ ] Connect frontend to backend APIs
	- [ ] Set up API service layer in frontend
	- [ ] Test all CRUD operations from UI
- [ ] Test end-to-end lead management flow
	- [ ] Add, update, and convert leads through UI
	- [ ] Verify notes and status changes persist

## Phase 5: Documentation & Delivery
- [ ] Write project README and setup guide
	- [ ] Document features and tech stack
	- [ ] Add setup and run instructions for backend and frontend
	- [ ] Include screenshots or demo (optional)
