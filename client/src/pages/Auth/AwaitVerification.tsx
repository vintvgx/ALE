const AwaitVerification = () => {
  return (
    <div className="flex flex-col items-center mt-24 h-screen w-screen">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className="text-gray-600">
          Thank you for signing up! We've sent a verification email to your
          email address. Please check your inbox and click on the verification
          link to activate your account.
        </p>
        <p className="mt-4 text-gray-600">
          If you haven't received the email, please check your spam folder.
        </p>
      </div>
    </div>
  );
};

export default AwaitVerification;
