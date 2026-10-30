
import { supabase } from "@/api/supabaseClient";
import { withBase } from "@/lib/withBase";

const fail = (error) => {
  if (error) {
    const e = new Error(error.message);
    e.status = error.status;
    throw e;
  }
};

const PROFILE_FIELDS = ["full_name", "store_name", "phone", "address", "ruc"];

export const base44 = {
  auth: {
    async me() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        await supabase.auth.signOut();
        const e = new Error("Not authenticated");
        e.status = 401;
        throw e;
      }

      const u = data.user;

      const { data: p } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", u.id)
        .maybeSingle();

      return {
        id: u.id,
        email: u.email,
        full_name: p?.full_name || u.user_metadata?.full_name || "",
        store_name: p?.store_name || "",
        phone: p?.phone || "",
        address: p?.address || "",
        ruc: p?.ruc || "",
      };
    },

    async updateMe(fields) {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        const e = new Error("Not authenticated");
        e.status = 401;
        throw e;
      }

      const row = {
        id: data.user.id,
        updated_at: new Date().toISOString(),
      };

      PROFILE_FIELDS.forEach((k) => {
        if (k in fields) row[k] = fields[k];
      });

      const { error } = await supabase.from("profiles").upsert(row);
      fail(error);
    },

    async loginViaEmailPassword(email, password) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (/email not confirmed/i.test(error.message)) {
          throw new Error(
            "Tu correo aún no está verificado. Regístrate de nuevo para recibir otro código."
          );
        }

        if (/invalid login credentials/i.test(error.message)) {
          throw new Error("Correo o contraseña incorrectos.");
        }

        fail(error);
      }
    },

    async register({ email, password }) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      fail(error);

      if (
        data?.user &&
        Array.isArray(data.user.identities) &&
        data.user.identities.length === 0
      ) {
        throw new Error("Este correo ya está registrado. Inicia sesión.");
      }

      return { needsVerification: !data?.session };
    },

    async verifyOtp({ email, otpCode }) {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "signup",
      });

      fail(error);

      return { access_token: data?.session?.access_token };
    },

    async resendOtp(email) {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      fail(error);
    },

    async resetPasswordRequest(email) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${withBase("/reset-password")}`,
      });

      fail(error);
    },

    async hasSession() {
      const { data } = await supabase.auth.getSession();
      return !!data?.session;
    },

    async resetPassword({ newPassword }) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      fail(error);
      await supabase.auth.signOut();
    },

    async loginWithProvider(provider, returnTo = "/dashboard") {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + withBase(returnTo),
        },
      });

      fail(error);
    },

    setToken() {},

    async logout(redirectUrl) {
      await supabase.auth.signOut();

      if (redirectUrl) {
        window.location.href = withBase(redirectUrl);
      }
    },

    redirectToLogin() {
      if (window.location.pathname !== withBase("/login")) {
        window.location.href = withBase("/login");
      }
    },
  },
};
