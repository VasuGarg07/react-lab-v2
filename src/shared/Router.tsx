import { Navigate, Outlet, ScrollRestoration, createBrowserRouter } from "react-router-dom";
import Blogify from "../apps/Blogify/Blogify";
import { blogDetailLoader, blogListLoader, homeLoader, myBlogsLoader, publishBlogAction, publishBlogLoader } from "../apps/Blogify/helpers/blog-router.actions";
import BlogDetail from "../apps/Blogify/pages/BlogDetail";
import BlogHome from "../apps/Blogify/pages/BlogHome";
import BlogListPage from "../apps/Blogify/pages/BlogList";
import MyBlogs from "../apps/Blogify/pages/MyBlogs";
import PublishBlog from "../apps/Blogify/pages/PublishBlog";
import BudgetBuddy from "../apps/BudgetBuddy/BudgetBuddy";
import HomePage from "../apps/BudgetBuddy/pages/Homepage";
import Overview from "../apps/BudgetBuddy/pages/Overview";
import Statistics from "../apps/BudgetBuddy/pages/Statistics";
import Timeline from "../apps/BudgetBuddy/pages/Timeline";
import NotFound from "../apps/Errors/NotFound";
import Glassmorphism from "../apps/Glassmorphism/Glassmorphism";
import Home from "../apps/Home/Home";
import Homeloan from "../apps/HomeloanWizard/Homeloan";
import { InvoiceProvider } from "../apps/InvoEase/InvoiceContext";
import Jobscape from "../apps/Jobscape/Jobscape";
import JobHome from "../apps/Jobscape/pages/JobHome";
import RegisterEmployer from "../apps/Jobscape/pages/RegisterEmployer";
import RegisterHero from "../apps/Jobscape/pages/RegisterHero";
import LeetcodeRivals from "../apps/LeetcodeRivals/LeetcodeRivals";
import PokeMemory from "../apps/PokeMemory/PokeMemory";
import { BattleProvider } from "../apps/Pokeverse/context/BattleSimContext";
import { PokedexProvider } from "../apps/Pokeverse/context/PokedexContext";
import { BattleScreen } from "../apps/Pokeverse/pages/BattleScreen";
import { PlayerSetupScreen } from "../apps/Pokeverse/pages/PlayerSetup";
import Pokedex from "../apps/Pokeverse/pages/Pokedex";
import PokemonDetails from "../apps/Pokeverse/pages/PokemonDetails";
import Pokeverse from "../apps/Pokeverse/pages/Pokeverse";
import { TeamSelectionScreen } from "../apps/Pokeverse/pages/TeamSelection";
import Details from "../apps/QuickByte/Details";
import Gallery from "../apps/QuickByte/Gallery";
import RecipeHaven from "../apps/QuickByte/RecipeHaven";
import { alphabetMeals, categoryMeals, mealDetails, regionalMeals, searchMeals } from "../apps/QuickByte/utils/api";
import Wrapper from "../apps/QuickByte/Wrapper";
import Quizzo from "../apps/Quizzo/Quizzo";
import { ResumeProvider } from "../apps/ResumeGen/context/ResumeContext";
import { sampleResume } from "../apps/ResumeGen/helpers/sample";
import ResumeEdge from "../apps/ResumeGen/pages/ResumeEdge";
import ResumeForm from "../apps/ResumeGen/pages/ResumeForm";
import ResumePreview from "../apps/ResumeGen/pages/ResumePreview";
import ResumeTemplates from "../apps/ResumeGen/pages/ResumeTemplates";
import TwoColumnResume from "../apps/ResumeGen/templates/TwoColumn";
import SnapFind from "../apps/SnapFind/SnapFind";
import Sudoku from "../apps/Sudoku/Sudoku";
import SuperTicTacToe from "../apps/SuperTicTacToe/SuperTicTacToe";
import SortingVisualizer from "../apps/Visualizer/Visualizer";
import AuthWrapper from "../auth/AuthWrapper";
import ForgotPassword from "../auth/ForgotPassword";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Navbar from "../components/Navbar";
import RegisterApplicant from "../apps/Jobscape/pages/RegisterApplicant";
import AuthGaurd from "../apps/Jobscape/guards/AuthGuard";
import RoleGuard from "../apps/Jobscape/guards/RoleGuard";
import UserDashboard from "../apps/Jobscape/pages/UserDashboard";
import EmployerOverview from '../apps/Jobscape/dashboard/Overview';
import { EmployerProfile, ApplicantProfile } from '../apps/Jobscape/dashboard/Profile';
import PostJob from "../apps/Jobscape/dashboard/PostJob";
import MyJobs from "../apps/Jobscape/dashboard/MyJobs";
import Settings from "../apps/Jobscape/dashboard/Settings";
import CompaniesList from "../apps/Jobscape/pages/CompaniesList";
import CompanyDetails from "../apps/Jobscape/pages/CompanyDetails";
import JobsList from "../apps/Jobscape/pages/JobsList";
import JobDetails from "../apps/Jobscape/pages/JobDetails";
import SavedJobs from "../apps/Jobscape/dashboard/SavedJobs";
import Recommendations from "../apps/Jobscape/dashboard/Recommendations";
import AppliedJobs from "../apps/Jobscape/dashboard/AppliedJobs";

export const router = createBrowserRouter([
  {
    path: '',
    element: <>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'auth',
        element: <AuthWrapper />,
        children: [
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          }
        ]
      },
      {
        path: 'jobscape',
        element: <Jobscape />,
        children: [
          {
            path: 'home',
            element: <JobHome />
          },
          {
            path: 'register',
            element: <AuthGaurd />,
            children: [
              { path: '', element: <RegisterHero /> },
              { path: 'employer', element: <RegisterEmployer /> },
              { path: 'applicant', element: <RegisterApplicant /> }
            ]
          },
          {
            path: 'employer',
            element: <RoleGuard guardRole="employer" />,
            children: [
              {
                path: '',
                element: <UserDashboard />,
                children: [
                  { path: 'overview', element: <EmployerOverview /> },
                  { path: 'profile', element: <EmployerProfile /> },
                  { path: 'post-job', element: <PostJob /> },
                  { path: 'jobs', element: <MyJobs /> },
                  { path: 'candidates', element: <>Saved Candidates</> },
                  { path: 'settings', element: <Settings /> },
                  { path: 'edit/:jobId', element: <PostJob /> },
                  { path: '', element: <Navigate to='overview' replace /> },
                ]
              }
            ]
          },
          {
            path: 'applicant',
            element: <RoleGuard guardRole="applicant" />,
            children: [
              {
                path: '',
                element: <UserDashboard />,
                children: [
                  { path: 'recommendations', element: <Recommendations /> },
                  { path: 'applications', element: <AppliedJobs /> },
                  { path: 'profile', element: <ApplicantProfile /> },
                  { path: 'saved-jobs', element: <SavedJobs /> },
                  { path: 'settings', element: <Settings /> },
                  { path: '', element: <Navigate to='recommendations' replace /> },
                ]
              }
            ]
          },
          { path: 'companies', element: <CompaniesList /> },
          { path: 'companies/:companyId', element: <CompanyDetails /> },
          { path: 'jobs', element: <JobsList /> },
          { path: 'jobs/:jobId', element: <JobDetails /> },
          // fallbacks
          { path: '', element: <Navigate to='home' replace /> },
        ]
      },
      {
        path: 'blogify',
        element: <Blogify />,
        children: [
          {
            path: 'home',
            element: <BlogHome />,
            loader: homeLoader
          },
          {
            path: 'publish',
            element: <PublishBlog />,
            loader: publishBlogLoader,
            action: publishBlogAction,
          },
          {
            path: 'edit/:blogId',
            element: <PublishBlog />,
            loader: publishBlogLoader,
            action: publishBlogAction,
          },
          {
            path: 'list',
            element: <BlogListPage />,
            loader: blogListLoader
          },
          {
            path: 'list/:author',
            element: <BlogListPage />,
            loader: blogListLoader
          },
          {
            path: 'me',
            element: <MyBlogs />,
            loader: myBlogsLoader
          },
          {
            path: 'blog/:blogId',
            element: <BlogDetail />,
            loader: blogDetailLoader
          },
          // fallbacks
          {
            path: '',
            element: <Navigate to='home' replace />
          },
          {
            path: '*',
            element: <Navigate to='' replace />
          }
        ]
      },
      {
        path: 'budget-buddy',
        element: <BudgetBuddy />,
        children: [
          {
            path: 'home',
            element: <HomePage />
          },
          {
            path: 'overview',
            element: <Overview />
          },
          {
            path: 'statistics',
            element: <Statistics />
          },
          {
            path: 'timeline',
            element: <Timeline />
          },
          // fallbacks
          {
            path: '',
            element: <Navigate to='home' replace />
          },
          {
            path: '*',
            element: <Navigate to='' replace />
          }
        ]
      },
      {
        path: 'pokeverse',
        element: <PokedexProvider outlet={<Outlet />} />,
        children: [
          {
            path: '',
            element: <Pokeverse />
          },
          {
            path: 'pokedex',
            element: <Pokedex />
          },
          {
            path: 'pokedex/:id',
            element: <PokemonDetails />,
          },
          {
            path: 'battle-sim',
            element: <BattleProvider><Outlet /></BattleProvider>,
            children: [
              {
                path: '',
                element: <PlayerSetupScreen />
              },
              {
                path: 'team-selection',
                element: <TeamSelectionScreen />
              },
              {
                path: 'battle',
                element: <BattleScreen />
              }
            ]
          }
        ]
      },
      {
        path: 'resume',
        element: <ResumeProvider><Outlet /></ResumeProvider>,
        children: [
          {
            path: '',
            element: <ResumeEdge />
          },
          {
            path: 'form',
            element: <ResumeForm />
          },
          {
            path: 'select-template',
            element: <ResumeTemplates />
          },
          {
            path: 'preview',
            element: <ResumePreview />
          },
          {
            path: 'test',
            element: <TwoColumnResume resume={sampleResume} />
          }
        ]
      },
      {
        path: 'invoease',
        element: <InvoiceProvider />
      },
      {
        path: 'sorting-visualizer',
        element: <SortingVisualizer />
      },
      {
        path: 'super-tic-tac-toe',
        element: <SuperTicTacToe />
      },
      {
        path: 'sudoku',
        element: <Sudoku />
      },
      {
        path: 'leetcode-rivals',
        element: <LeetcodeRivals />
      },
      {
        path: 'glassmorphism',
        element: <Glassmorphism />,
      },
      {
        path: 'homeloan-wizard',
        element: <Homeloan />
      },
      {
        path: 'poke-memory',
        element: <PokeMemory />
      },
      {
        path: 'snapfind',
        element: <SnapFind />
      },
      {
        path: 'quizzo',
        element: <Quizzo />
      },
      {
        path: 'recipe-haven',
        element: <>
          <Outlet />
          <ScrollRestoration />
        </>,
        children: [
          {
            path: '',
            element: <RecipeHaven />
          },
          {
            path: 'search/:searchTerm',
            element: <Wrapper children={<Gallery />} />,
            loader: searchMeals
          },
          {
            path: 'category/:categoryId',
            element: <Wrapper children={<Gallery />} />,
            loader: categoryMeals
          },
          {
            path: 'region/:areaId',
            element: <Wrapper children={<Gallery />} />,
            loader: regionalMeals
          },
          {
            path: 'alphabet/:letter',
            element: <Wrapper children={<Gallery />} />,
            loader: alphabetMeals
          },
          {
            path: 'area/:areaId',
            element: <Wrapper children={<Gallery />} />,
            loader: regionalMeals
          },
          {
            path: 'meal/:mealId',
            element: <Wrapper children={<Details />} />,
            loader: mealDetails
          },
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);

export const navigate = router.navigate; 