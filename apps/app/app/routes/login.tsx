import { loginUser } from "@/lib/users";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { Button } from "@z1/ui/button";
import { Input } from "@z1/ui/input";
import { Label } from "@z1/ui/label";
import React from "react";

export const Route = createFileRoute("/login")({
  beforeLoad({ context }) {
    if (context.user) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});

function formReducer(
  state: { email: string; password: string },
  action: { type: string; payload: string },
) {
  return { ...state, [action.type]: action.payload };
}

function Login() {
  const router = useRouter();
  const [form, dispatch] = React.useReducer(formReducer, {
    email: "",
    password: "",
  });

  const { mutateAsync: handleLogin } = useMutation({
    mutationFn: () =>
      loginUser({ data: { email: form.email, password: form.password } }),
    onSuccess: () => {
      router.navigate({ to: "/" });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-muted">
      <div className="flex items-center justify-center">
        <div className="max-w-sm w-full md:w-sm flex flex-col items-center border rounded-lg p-6 shadow-sm bg-background">
          <h1 className="text-2xl font-bold">z1</h1>
          <p className="mt-4 text-muted-foreground">Log into your account</p>
          <form
            className="flex flex-col gap-4 mt-6 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                value={form.email}
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
                className="w-full"
                type="email"
                placeholder="user@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                value={form.password}
                onChange={(e) =>
                  dispatch({ type: "password", payload: e.target.value })
                }
                className="w-full"
                type="password"
                placeholder="Password"
              />
            </div>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
