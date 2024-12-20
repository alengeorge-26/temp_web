import { BrowserRouter,Routes, Route} from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import FileUploadPage from "./pages/fileUploadPage/FileUploadPage";
import FolderUploadPage from "./pages/folderUploadPage/FolderUploadPage";
import ViewFilePage from "./pages/viewFilePage/ViewFilePage.jsx";
import { UserContextProvider } from "./contextapi.js/user_context.jsx";
import ProtectedRoute_1 from "./components/utils/protectedRoute/ProtectedRoute_1.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import HighlightPDF from "./pages/highlightPDF/HighlightPDF.jsx";
import DashboardPage from "./pages/dashboardPage/DashboardPage.jsx";

function App() {

  return (
    <UserContextProvider>
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />}/>

            <Route exact path='/login' element={localStorage.getItem("access_token")===null ? <LoginPage /> : <HomePage />} />

            <Route element={<ProtectedRoute_1 roles={['UPL','ADM']}/>}>
              <Route exact path="/fileuploader" element={<FileUploadPage />} />
              <Route exact path="/folderuploader" element={<FolderUploadPage />} />
            </Route>

            <Route element={<ProtectedRoute_1 roles={['VWR', 'ADM']}/>}>
              <Route exact path="/viewfiles" element={<ViewFilePage />} />
              <Route exact path="/highlightpdf" element={<HighlightPDF />} />
            </Route>


            <Route element={<ProtectedRoute_1 roles={['ADM']}/>}>
              <Route exact path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </UserContextProvider>
  )
}

export default App