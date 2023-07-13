# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
So, here's what I've come up with:
- update agent model
- update facility interface
- update reprort generation / metadata
- update documentation (?)

Let's go over each of the tickets, I'll try my best to explain it here:
1. Update agent model
The first thing needs to be done is updating the Agent model to include a new field for the custom ID that Facilities can save. This field will store the custom ID provided by the Facility for each Agent.
Acceptance criteria: 
- There is a custom ID in the Agent model
- It's stored and retrievable from the database
Estimation: 3 hours
implementation details:
update the API endpoints and database queries related to the Agent model to handle the customId field.

2. Update facility interface
The next step is to update the Facility interface to allow Facilities to save custom IDs for each Agent they work with.

Acceptance Criteria:
- There is a new section in the Facility interface to manage custom IDs for Agents
- There is a a form to add/edit custom IDs for each Agent associated with the Facility
- there is a way to validate the custom ID inputs to ensure they meet any requirements (e.g., uniqueness, length limits)
- There is a way to save and update the custom IDs in the database for each Agent

Implementation Details:
Implement validation logic for the custom ID inputs.
Integrate the frontend with the backend API to save and update the custom IDs in the database.

