import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import AddPostScreen from './screens/AddPostScreen'
import PostListScreen from './screens/PostListScreen'
import EditPostScreen from './screens/EditPostScreen'
import PreviewScreen from './screens/PreviewScreen'
import UploadPostScreen from './screens/UploadPostScreen'
import { ApolloProvider } from '@apollo/client'
import client from './lib/apolloClient'
import MediaScreen from './screens/MediaScreen'
import OneDriveScreen from './screens/OneDriveScreen'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<PostListScreen />} />
      <Route path='/add-post' element={<AddPostScreen />} />
      <Route path='/edit-post' element={<EditPostScreen />} />
      <Route path='/preview-post' element={<PreviewScreen />} />
      <Route path='/media' element={<MediaScreen />} />
      <Route path='/upload-post' element={<UploadPostScreen />} />
      <Route path='/onedrive' element={<OneDriveScreen />} />
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);


reportWebVitals();
