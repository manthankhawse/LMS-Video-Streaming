import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = signupSchema.safeParse(formData);
  
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
  
      setErrors({});
      console.log(result.data);
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    }
  };
  

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input name="username" type="text" placeholder="johndoe" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input name="password" type="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <Button type="submit" className="w-full">
          Signup
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
