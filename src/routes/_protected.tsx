import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/context/AuthContext';
import {
  Outlet,
  createFileRoute,
  redirect,
  // redirect,
  useRouter,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context: { auth }, location }) => {
    if (auth.loaded && !auth.authClient) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
  component: ProtectedRoutes,
});

function ProtectedRoutes() {
  const auth = useAuth();
  const router = useRouter();

  async function onClick(): Promise<void> {
    await auth.onLogout();
    await router.invalidate();
  }

  return (
    <>
      <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
        <div className="flex h-14 w-full items-center gap-3 px-4">
          <div className="ml-auto flex items-center gap-3">
            <Button onClick={onClick}>Logout</Button>

            <ThemeToggle />
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
