import AuthForm from '../components/AuthForm';

export default function Signup() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <AuthForm type="signup" />
    </div>
  );
}