# Travel News & Guide - Frontend
## Project Overview

The **"Travel News & Guides"** API is a RESTful web service that provides users with the ability to interact with a platform where they can share travel experiences, tips, and recommendations. The API supports various user-centric features such as user authentication, profile management, content creation, interaction, and reviews.

This backend API is designed to help users connect, share their travel insights, and discover new destinations. It allows for rich media content such as images and detailed descriptions to be uploaded with posts, enabling a visually appealing and engaging experience for other travelers.

The platform offers multiple ways for users to interact with content, including commenting on posts, liking or disliking content, and submitting reviews for travel destinations. Whether you're planning your next trip or just looking for inspiration, this API will support all your travel-related content sharing needs.


## Technologies Used

- **Node.js**: Server-side rendered React framework for the frontend.
- **TypeScript**: For type-safe development.
- **Mongoose**: As the Object Data Modeling (ODM) library for MongoDB.
- **Express**: As the web framework for building the RESTful API.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Devloper-solaiman/news-client
   ```

2. **Navigate into the project directory**:

   ```bash
   cd news-client

   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

   _or_

   ```bash
   bun install
   ```

4. **Create a `.env.local` file in the root directory and add your environment variables**:

   ```bash
   NEXT_PUBLIC_WORKSPACE=development
   NEXT_PUBLIC_BASE_API=https://news-server-fawn.vercel.app/api/v1
   NEXT_PUBLIC_LIVE_API=https://news-server-fawn.vercel.app/api/v1
   NEXT_PRIVATE_TURBOPACK=false
   NEXT_PUBLIC_JWT_ACCESS_TOKEN=your_jwt_access_token_here
   NEXT_PUBLIC_CLOUDINARY_URL=https://YOUR_CLOUDINARY_URL
   GOOGLE_CLIENT_ID= client_Id
   GOOGLE_CLIENT_SECRET=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
   NEXTAUTH_SECRET=mS8AJD9C1jaYCvLYebV1OuZr66ggv1fLUj8+o1nTiyw=
   NEXTAUTH_URL=http://localhost:3000
   ```
## Table of Contents

- [Features](#features)
- [Models](#models)
- [User Model](#user-model)
- [Post Model](#post-model)
- [Comment Model](#comment-model)
- [React Model](#react-model)
- [Review Model](#review-model)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication-auth)
- [User Profile](#user-profile-profile)
- [Users](#users-users)
- [Posts](#posts-posts)
- [Comments](#comments-comments)
- [Reactions](#reactions-react)
- [Payment](#payment-payment)
- [Conclusion](#conclusion)

## Features

The Travel Tips & Destination Guides API provides a robust set of features to facilitate users in sharing travel experiences, tips, and recommendations. Below is an in-depth look at the core features provided by the API:

1. User Authentication
User Registration: New users can sign up by providing basic information such as name, email, and password. Once registered, they gain access to the platform and can create posts, leave comments, and interact with content.
Login: Users can log into the platform by entering their email and password, receiving a secure JWT (JSON Web Token) for session management.
JWT-Based Authentication: After login, users are granted a JWT, which is used for authenticating subsequent requests to access protected endpoints.
Password Reset: If users forget their password, they can request a password reset via email to regain access to their accounts.
2. Profile Management
Create and Update Profile: Users can create or update their personal profiles, which include details like name, email, and profile picture. The profile can be updated at any time to reflect changes in the user's personal information.
Profile Picture Upload: Each user can upload and update their profile image, allowing for personalized representation on the platform.
User Activity: Users can view a detailed list of their posted content, comments, and interactions with other users, providing an overview of their activities.
3. Post Creation and Management
Create Travel Posts: Users can share travel tips, experiences, and destination recommendations by creating posts. Each post can include a title, detailed description, and media (images).
Multi-Image Support: A single post can include multiple images to enrich the content and offer a visually appealing experience for the viewers.
Edit or Delete Posts: Users have the ability to modify or delete their own posts at any time. This allows them to update information, correct mistakes, or remove outdated content.
Categorization: Posts can be categorized into types such as Destination Guides, Travel Tips, or Reviews, helping users to easily find content relevant to their interests.
4. Post Interaction
Comment on Posts: Users can comment on posts, sharing their thoughts, experiences, or asking questions about the content. This fosters engagement and community interaction.
Reactions to Posts: Users can react to posts using predefined reactions, such as "Like", "Helpful", or "Exciting", which gives content creators feedback on their posts.
Like/Dislike: In addition to specific reactions, users can like or dislike posts to indicate their support or disagreement.
5. Destination Reviews
Review Travel Destinations: Users can leave reviews for specific destinations, providing ratings and detailed feedback based on their experiences.
Rating System: Reviews include a rating system (1-5 stars), allowing other users to gauge the quality of the destination based on previous visitors' opinions.
Multimedia Reviews: Users can attach images to their reviews to make them more informative and visually engaging, showcasing their travel experiences.
6. Search and Filter Content
Search Posts by Keywords: Users can search for posts based on keywords, such as destination names, tips, or general travel themes.
Content Filtering: Users can filter posts by categories, ratings, or destination, helping them narrow down their search to relevant content.
Advanced Filters: Users can apply additional filters based on post types (tips, reviews, destinations) and interactions (e.g., highly-rated posts or posts with the most comments).
7. User Notifications
Comment Notifications: Users receive notifications when someone comments on their posts, allowing them to stay updated on discussions related to their content.
Reaction Notifications: If someone reacts to a user's post (e.g., likes, dislikes, or adds a custom reaction), the user will be notified.
Review Notifications: Users are notified when someone leaves a review on a destination that they are interested in or have visited.
8. Admin Features (Optional)
Admin Dashboard: Administrators can access an overview of the platform's activity, including user sign-ups, post statistics, and more.
Content Moderation: Admins have the ability to moderate content, ensuring that all posts and comments adhere to community guidelines. They can delete inappropriate content and suspend users who violate the platform's rules.
User Management: Admins can view, update, or remove user accounts, ensuring smooth platform operation and security.
9. Content Personalization
User Feed: Each user can have a personalized feed of posts based on their preferences and past interactions. This makes it easier for users to find content they are interested in, whether it’s travel tips, destination guides, or other users' experiences.
Recommended Posts: Based on a user’s activity, the system can suggest relevant posts, destinations, or travel tips, helping users discover new content.
10. Advanced Post Settings (Optional)
Post Privacy Settings: Users can control the visibility of their posts, making them either public or restricted to certain users. This provides control over who can view and interact with the content.
Post Expiry: Optionally, users can set posts to expire after a specific period, automatically removing them from the platform when the time comes.

## Models
 
 ![Image 1](https://res.cloudinary.com/dcbvputnw/image/upload/v1742038438/travel1_nqexuf.png)
![Image 2](https://res.cloudinary.com/dcbvputnw/image/upload/v1742038436/travel3_h8xend.png)
![Image 3](https://res.cloudinary.com/dcbvputnw/image/upload/v1742038436/travel4_dgwlvc.png)

This README provides an overview of the "Travel Tips & Destination Guides" backend API. Each endpoint is designed to facilitate user interactions and enrich the travel community with shared experiences. For further information, feel free to explore the codebase and its documentation.
