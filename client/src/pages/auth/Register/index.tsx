import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Watch profile picture field

  // Handle profile picture change
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size (optional)
      const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!fileTypes.includes(file.type)) {
        alert("Only JPG, JPEG, and PNG files are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB.");
        return;
      }

      // Set file in react-hook-form
      setValue("profilePicture", file);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <section className='w-full min-h-screen h-full flex justify-center items-center bg-gray-50'>
      <div className='sm:w-[500px] w-[90%] h-auto p-8 shadow-lg border border-gray-200 rounded-xl bg-white'>
        <h2 className='text-3xl font-semibold text-center text-gray-800'>Register</h2>
        <p className='text-center text-gray-600 mt-2'>Create your account to get started</p>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-1 mt-8 grid sm:grid-cols-2 gap-5'>
          {/* Full Name */}
          <div className="grid w-full items-center gap-1.5 col-span-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              type="text" 
              id="name" 
              placeholder="John Doe" 
              {...register("name", { required: "Full Name is required" })} 
              className="focus:outline-none" 
            />
            {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
          </div>
          
          {/* Email */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="john@example.com" 
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address"
                }
              })} 
              className="focus:outline-none" 
            />
            {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
          </div>

          {/* Password */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" }})} 
              className="focus:outline-none" 
            />
            {errors.password && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
          </div>

          {/* Confirm Password */}
          <div className="grid w-full items-center gap-1.5 col-span-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              type="password" 
              id="confirmPassword" 
              placeholder="••••••••" 
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match"
              })} 
              className="focus:outline-none" 
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{String(errors.confirmPassword.message)}</p>}
          </div>

          {/* Profile Picture Upload */}
          <div className='col-span-2'>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <input 
              type="file" 
              id="profilePicture"
              accept="image/*" 
              className="focus:outline-none border p-2 rounded w-full"
              onChange={handleProfilePictureChange}
            />
            {errors.profilePicture && <p className="text-red-500 text-sm">{String(errors.profilePicture.message)}</p>}

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full col-span-2 cursor-pointer bg-primary hover:bg-primary/90 text-white">
            Create Account
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 col-span-2">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
