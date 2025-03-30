import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {store} from "./app/core/store.ts";
import {Provider} from "react-redux";
import './app/core/di/container' // ← ensures container is initialized

// Now all code can use `globalThis.container` safely

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)
