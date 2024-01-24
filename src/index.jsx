import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import "./index.scss";



// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return <MainView />;
        // <div className = "my-flix"><div>Good morning</div></div>
};

//Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);