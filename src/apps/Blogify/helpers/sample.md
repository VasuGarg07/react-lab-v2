## Updated Structure for Notebooks + Blogs

### Routes
```typescript
{
    path: '/blogify',
    element: <BlogLayout />,
    children: [
        // Home
        { path: '', element: <BlogHome /> },
        
        // Notebooks
        { path: 'notebooks', element: <NotebookList /> },
        { path: 'notebooks/me', element: <MyNotebooks /> },
        { path: 'notebooks/create', element: <NotebookForm /> },
        { path: 'notebooks/edit/:notebookId', element: <NotebookForm /> },
        { path: 'notebooks/author/:author', element: <NotebookList /> },
        { path: 'notebooks/:notebookId', element: <NotebookDetail /> },
        
        // Blogs
        { path: 'blogs', element: <BlogList /> },
        { path: 'blogs/me', element: <MyBlogs /> },
        { path: 'blogs/author/:author', element: <BlogList /> },
        { path: 'blogs/publish/:notebookId', element: <BlogForm /> },
        { path: 'blogs/edit/:blogId', element: <BlogForm /> },
        { path: 'blogs/:blogId', element: <BlogDetail /> },
    ]
}
```

### Files to Update/Create

| File | Status | Notes |
|------|--------|-------|
| **Components** |||
| `BlogCard.tsx` | Update | Remove `coverImageUrl`, use notebook's cover |
| `BlogGallery.tsx` | Keep | Works as-is |
| `NotebookCard.tsx` | **New** | Card for notebook display |
| `NotebookGallery.tsx` | **New** | Grid + pagination for notebooks |
| `BlogLayout.tsx` | Update | Update nav items |
| **Pages** |||
| `BlogHome.tsx` | Update | Show featured notebooks + recent blogs |
| `BlogList.tsx` | Keep | Minor route updates |
| `BlogDetail.tsx` | Update | Remove `coverImageUrl`, link to notebook |
| `BlogForm.tsx` | Rename | From `PublishBlog.tsx`, remove cover image |
| `MyBlogs.tsx` | Keep | Minor updates |
| `NotebookList.tsx` | **New** | Public notebooks list |
| `MyNotebooks.tsx` | **New** | User's notebooks with stats |
| `NotebookDetail.tsx` | **New** | Notebook + its blogs |
| `NotebookForm.tsx` | **New** | Create/edit notebook |
| **Hooks** |||
| `useBlogifyQueries.ts` | Keep | Already updated |
| `useBlogifyMutations.ts` | Keep | Already updated |
| `useBlogifyActions.ts` | **Delete** | Not needed |
| `usePagination.ts` | Keep | Works for both |

---

Want me to start updating the files? I suggest this order:

1. Delete actions hook
2. Update `BlogLayout.tsx` (new nav structure)
3. Create `NotebookCard.tsx` + `NotebookGallery.tsx`
4. Create notebook pages (`NotebookList`, `MyNotebooks`, `NotebookDetail`, `NotebookForm`)
5. Update existing blog components/pages