"use server";

import { headers } from "next/headers";

type HubspotFormSubmission = {
  formId: string;
  fields: { name: string; value: string }[];
  context?: {
    pageUri?: string;
    pageName?: string;
    hutk?: string; // HubSpot usertoken
  };
  legalConsentOptions?: any;
};

type HubspotFormResponse = {
  inlineMessage?: string;
  errors?: any[];
  status: string;
  message?: string;
};

export async function submitToHubspotForm({
  formId,
  fields,
  context,
  legalConsentOptions,
}: HubspotFormSubmission): Promise<HubspotFormResponse> {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/46321310/${formId}`;

  const body: any = {
    fields,
  };

  if (context) {
    body.context = context;

    const ip = (await headers()).get("x-forwarded-for");
    if (ip) {
      body.context.ipAddress = ip;
    }
  }

  if (legalConsentOptions) {
    body.legalConsentOptions = legalConsentOptions;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    try {
      const data = await res.json();
      return {
        ...data,
        status: "success",
      };
    } catch {
      return {
        status: "success",
      };
    }
  } else {
    let errorMsg = "Unknown error";
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || JSON.stringify(errorData);
      return {
        status: "error",
        message: errorMsg,
        errors: errorData.errors || [],
      };
    } catch {
      return {
        status: "error",
        message: errorMsg,
      };
    }
  }
}
