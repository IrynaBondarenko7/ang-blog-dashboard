# Recipe Blog Content Management Dashboard

This is a content management dashboard for creating and editing posts and categories for a recipe blog. The dashboard provides two main sections for managing categories and posts. It offers an intuitive interface for content creation with rich text editing features, as well as full integration with Firebase for data storage and Firebase Storage for image management.

## Features

- **Category and Post Management**: The dashboard has two sections—one for managing categories and another for posts.
- **Content Creation and Editing**: Users can create and edit posts with a rich text editor that helps format titles, subtitles, and lists for improved readability.
- **Featured Posts**: Users can mark posts as "Featured" to highlight them on the main blog.
- **Image Storage**: All images used in posts are stored in Firebase Storage for easy management.
- **Real-time Database**: All post and category information is stored in Firebase's real-time database, ensuring seamless updates across all users.
- **Post Actions**: Users can create new posts, edit existing ones, delete posts, and manage categories from the dashboard.
- **Notification Alerts**: Use of `ngx-toastr` for displaying success or error notifications to the user during interactions with the dashboard.

## Technologies Used

- **Angular**: A modern front-end framework for building single-page applications with dynamic content and seamless user interactions.
- **Bootstrap**: A responsive design framework for creating clean and mobile-friendly user interfaces.
- **Firebase**: A cloud platform for storing and retrieving post and category data in real-time.
- **Firebase Storage**: Used for storing images uploaded to the platform.
- **ngx-toastr**: A library for displaying notifications to the user, such as success or error messages.
- **Kolkov Angular Editor**: A WYSIWYG (What You See Is What You Get) editor for creating and editing rich text content, including headings, lists, and other HTML elements.

## How to Run the App

1. Clone the repository to your local machine.
2. Install required dependencies:
   `npm install`
3. Set up Firebase and configure the database and storage in the app.
4. Run the application locally:
   `npm start`
5. Open the app in your browser at `http://localhost:4300`.
