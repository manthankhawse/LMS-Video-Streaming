import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useState } from "react"

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setFormData((prev)=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
      const result = loginSchema.safeParse(formData);
  
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

      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      setErrors({});
      console.log(data);
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    }
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" value={formData.username} onChange={handleChange} type="text" placeholder="Username" required />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" value={formData.password} name="password" onChange={handleChange} type="password" placeholder="Password" required />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
