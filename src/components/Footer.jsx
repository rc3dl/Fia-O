
import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { withBase } from "@/lib/withBase";

function Logo() {
  return (
    <img
      src={withBase("/Logo-fiao-120x40.svg")}
      alt="FIA'O"
      className="h-8 w-auto select-none"
    />
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full">
      <div
        className="w-full py-6"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <div className="mx-auto max-w-6xl px-6">

          <div className="flex flex-col md:flex-row justify-between gap-6">

            {/* Brand */}
            <div className="max-w-xs">
              <Logo />
              <p
                className="text-xs mt-2 leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {t("The app for shopkeepers to manage their credit lines without paper notebooks or wall markings.")}
              </p>
            </div>

            {/* Useful Links */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link
                to="/"
                className="hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                {t("Website")}
              </Link>

              <Link
                to="/account"
                className="hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                {t("My Account")}
              </Link>

              <Link
                to="/terms"
                className="hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                {t("Terms of Service")}
              </Link>

              <Link
                to="/privacy"
                className="hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                {t("Privacy Policy")}
              </Link>

              <a
                href="mailto:hola@fiao.app"
                className="flex items-center gap-1.5 hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                <Mail className="w-3.5 h-3.5" />
                {t("Contact")}
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="mt-5 pt-4 border-t flex flex-col sm:flex-row justify-between gap-2"
            style={{ borderColor: "var(--border-cream)" }}
          >
            <span
              className="text-xs"
              style={{ color: "var(--text-faint)" }}
            >
              {t("© 2026 FIA'O. All rights reserved.")}
            </span>

            <span
              className="text-xs"
              style={{ color: "var(--text-faint)" }}
            >
              {t("Made for local businesses")}
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
