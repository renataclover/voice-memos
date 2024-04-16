import { SnackbarProvider } from 'notistack';

export default function NotistackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
