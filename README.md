Understood! Here's the `README.md` tailored for the already connected frontend (based on the modified snippets provided), assuming that the frontend is now connected and ready for use:

```markdown
# Task Manager Frontend

This is the frontend for the Task Manager application. The app allows users to create, edit, and manage tasks, with features like custom task titles, color coding, and data persistence using `localStorage` & `mySQL` via Prisma CLI.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

You can verify your installations by running:

```bash
node -v
npm -v
```

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/deadtargaryen/nooro-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-manager-frontend
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Running the Application

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

This will start the application, and it will be available at `http://localhost:3000`. Open this URL in your browser to view the app.

## Project Structure

- `app/`: Contains the main React components and pages.
  - `tasks/`: Includes task-related pages, such as the `EditTask` page.
  - `ui/`: Contains reusable UI components like `BackIcon`, `TickIcon`, and buttons.
- `public/`: Static assets such as the application logo (`logo.png`).
- `components/`: Contains reusable components like `Button` and UI elements.
- `utils/`: Utility functions for managing tasks (e.g., fetching tasks from `localStorage`).

## Key Pages

- **Home Page**: Displays the task list. You can manage tasks (create, edit, and delete) directly from the homepage.
- **Edit Task Page**: 
  - Allows users to edit the title and color of a task.
  - Accessible via the `/tasks/edit/:id` route.
  
## Task Management

- **Creating Tasks**: 
  - You can create new tasks with a title and a color.
  - Color options are provided as clickable circular buttons. The available colors are: red, orange, yellow, green, blue, purple, pink, and brown.
  
- **Editing Tasks**: 
  - Tasks can be edited by navigating to the `/tasks/edit/:id` route and modifying the task's title and color.
  - The updated task is saved back to `localStorage`.
  
- **Data Persistence**: 
  - Tasks are stored in the browser's `localStorage` alongside `mySQL` via Prisma CLI. This ensures that tasks persist even after the page is refreshed.

## Example Task Colors

You can choose from the following task colors:

- Red
- Orange
- Yellow
- Green
- Blue
- Purple
- Pink
- Brown

The color you select will be used to visually categorize the task.

## Development Tips

- **Component Reusability**: 
  - Components like `Button`, `TaskItem`, and others are designed to be reused. Feel free to extend and modify components as necessary.
  
- **State Management**: 
  - This app does not use complex state management libraries (like Redux). Instead, it relies on React's `useState` and `useEffect` for managing local state.

## Testing

- At this stage, no automated tests are included. However, you can add unit tests using frameworks like [Jest](https://jestjs.io/) or [React Testing Library](https://testing-library.com/).

## Contribution

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch: `git checkout -b my-new-feature`.
4. Make your changes.
5. Commit your changes: `git commit -am 'Add new feature'`.
6. Push to the branch: `git push origin my-new-feature`.
7. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```