## Today's Progress

### 2025/04/02

- Created user stories  
- Built the app skeleton  
- Worked with Figma, selecting colors and fonts  
- Started working on the React Native map structure  
- Created a backlog in the GitHub project  

### 2025/04/09

- The project **`flood-app`** was created following the installation guide
- Used `npx create-expo-app` to scaffold the project
- Started with `npx expo start` using Metro Bundler
- Tested in a physical mobile device via **Expo Go**
- Installed core packages for navigation and UI

### 2025/04/16

- Create card, modal, text and button components
- Checked font alternatives
- Create a basic map structure
- Plannering of project.

### 2025/04/30

#### Data with Context and Fetch

Using **React Context** to load and share data from the backend with all components.

#### Why fetch is used in the context

Instead of calling `fetch()` in every component, we do it once inside the context. This makes it easier to:

- Avoid repeating the same API calls
- Keep components clean and focused on UI
- Handle loading and error states in one place

We fetch data from our local backend at `http://localhost:5000`, like:

```js
fetch("http://localhost:5000/api/tips");

