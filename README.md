# Campaign Feedback API

## Project Description

Campaign Feedback API is a RESTful API for creating marketing campaigns, adding questions to campaigns, collecting user feedback, and generating campaign summaries. The API supports two types of questions:

- **RATING**: questions where users can rate on a scale, for example, from 1 to 5 stars.
- **CHOICE**: questions where users can select one or more options from a provided list.

Users can submit feedback on a campaign by answering these questions. The API also allows retrieving a campaign summary, including the number of feedbacks, the average rating for `RATING` type questions, and the count of selected options for `CHOICE` type questions.

---

## Features

1. **Create Campaign**: Add a new campaign with a set of questions.
2. **Get Campaign Summary**: Retrieve a summary of feedback, including detailed information for each question.
3. **Submit Feedback**: Users can submit feedback to the campaign by answering questions.

---

## Technologies Used

- **Node.js**: Server platform for running JavaScript.
- **Express.js**: Framework for building REST APIs.
- **Sequelize**: ORM for working with relational databases.
- **PostgreSQL**: Relational databases.

---

## Endpoints

### 1. Create Campaign

**POST** `/campaigns`
This endpoint allows creating a new campaign with a set of questions.

#### REQUEST
**Request Body (JSON)**:

```json
{
  "name": "Campaign Name",
  "description": "Description of the campaign",
  "questions": [
    {
      "text": "Rate our service",
      "type": "RATING"
    },
    {
      "text": "Choose your preferred options",
      "type": "CHOICE",
      "options": ["Option 1", "Option 2", "Option 3"]
    }
  ]
}
```
#### RESPONSE
**Success Response (201 Created)**:
```json
{
  "id": 1,
  "name": "Campaign Name",
  "description": "Description of the campaign"
}
```
**Error Response (4xx/5xx)**:
```json
{
  "message": "Failed to create campaign",
  "error": "Error details here"
}
```

### 2. Submit Feedback for Campaign

**POST** `/feedback`
This endpoint allows users to submit feedback for a campaign.

#### REQUEST
**Request Body (JSON)**:

```json
{
  "campaignId": 1,
  "userId": 1,
  "answers": [
    {
      "questionId": 1,
      "ratingValue": 5
    },
    {
      "questionId": 2,
      "selectedOptions": ["Option 1", "Option 3"]
    }
  ]
}
```
#### RESPONSE
**Success Response (201 Created)**:
```json
{
  "id": 1,
  "campaignId": 1,
  "userId": 1
}
```
**Error Response (4xx/5xx)**:
```json
{
  "message": "Internal server error"
}
```

### 3. Get Campaign Summary

**GET** `/campaigns/:id/summary`
This endpoint returns a summary of a campaign, including the number of feedbacks, the average rating for RATING type questions, and the count of selected options for CHOICE type questions.

#### Parameters

- **id (URL parameter)**: - A number representing the campaign ID for which the summary is requested.

#### RESPONSE
**Success Response (200 OK)**:
```json
{
  "totalFeedbacks": 3,
  "questionsSummary": [
    {
      "name": "Rate our service",
      "type": "RATING",
      "averageRating": 4.33
    },
    {
      "name": "Choose your preferred options",
      "type": "CHOICE",
      "optionCounts": {
        "Option 1": 2,
        "Option 2": 1,
        "Option 3": 0
      }
    }
  ]
}
```
**Error Response (404 Not Found)**:
```json
{
  "message": "Campaign not found"
}
```
