import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Glossary } from "./pages/Glossary";
import { LessonPage, ReviewPage } from "./pages/Session";
import { Path } from "./pages/Path";
import { Settings } from "./pages/Settings";
import { TabLayout } from "./ui/TabLayout";

export function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-lg">
        <Routes>
          <Route element={<TabLayout />}>
            <Route path="/" element={<Path />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
