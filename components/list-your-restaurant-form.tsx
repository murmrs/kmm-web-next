"use client";

import { submitToHubspotForm } from "@/lib/hubspot";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

type Location = {
  name: string;
  address: string;
};

type FormValues = {
  name: string;
  email: string;
  businessName: string;
  locations: Location[];
  howDidYouHear: string;
};

const HOW_DID_YOU_HEAR_OPTIONS = [
  { value: "", label: "Select an option" },
  { value: "google", label: "Google Search" },
  { value: "social", label: "Social Media" },
  { value: "referral", label: "Referral" },
  { value: "event", label: "Event" },
  { value: "other", label: "Other" },
];

export default function ListYourRestaurantForm({
  className,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      locations: [],
      howDidYouHear: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  // Success state
  const [success, setSuccess] = React.useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSuccess(false);
    // Split the name into first and last name
    const [firstName, ...lastNameParts] = data.name.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    const res = await submitToHubspotForm({
      formId: "27e59028-2f15-4fbb-9f4c-7f749e694626",
      context: {
        pageUri: window.location.href,
      },
      fields: [
        { name: "email", value: data.email },
        { name: "firstname", value: firstName },
        { name: "lastname", value: lastName },
        { name: "0-2/name", value: data.businessName },
        { name: "referral_source", value: data.howDidYouHear },
        {
          name: "0-2/locations",
          value: data.locations
            .map((l) => [l.name, l.address].filter(Boolean).join(" - "))
            .join(", "),
        },
      ],
    });
    console.log(res);
    if (res && res.status === "success") {
      setSuccess(true);
      reset();
    } else {
      setSuccess(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium">
          Your Name <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="border border-border rounded px-3 py-2"
        />
        {errors.name && (
          <span className="text-destructive text-sm">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email address",
            },
          })}
          className="border border-border rounded px-3 py-2"
        />
        {errors.email && (
          <span className="text-destructive text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="businessName" className="font-medium">
          Restaurant/Business Name <span className="text-destructive">*</span>
        </label>
        <input
          id="businessName"
          type="text"
          {...register("businessName", {
            required: "Business name is required",
          })}
          className="border border-border rounded px-3 py-2"
        />
        {errors.businessName && (
          <span className="text-destructive text-sm">
            {errors.businessName.message}
          </span>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="font-medium">Locations (optional)</label>
          <button
            type="button"
            onClick={() => append({ name: "", address: "" })}
            className="text-primary text-sm hover:underline"
          >
            + Add Location
          </button>
        </div>
        {fields.length === 0 && (
          <p className="text-muted-foreground text-sm mt-1">
            If you have multiple locations, you can add them here.
          </p>
        )}
        <div className="flex flex-col gap-4 mt-2">
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="border border-border rounded p-3 flex flex-col gap-2 relative"
            >
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute top-2 right-2 text-destructive text-xs"
                aria-label="Remove location"
              >
                Remove
              </button>
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium"
                  htmlFor={`locations.${idx}.name`}
                >
                  Location Name
                </label>
                <input
                  id={`locations.${idx}.name`}
                  type="text"
                  {...register(`locations.${idx}.name` as const)}
                  className="border border-border rounded px-3 py-2"
                  placeholder="e.g. Downtown"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium"
                  htmlFor={`locations.${idx}.address`}
                >
                  Address
                </label>
                <input
                  id={`locations.${idx}.address`}
                  type="text"
                  {...register(`locations.${idx}.address` as const)}
                  className="border border-border rounded px-3 py-2"
                  placeholder="e.g. 123 Main St, City"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="howDidYouHear" className="font-medium">
          How did you hear about us? <span className="text-destructive">*</span>
        </label>
        <select
          id="howDidYouHear"
          {...register("howDidYouHear", { required: "This field is required" })}
          className="border border-border rounded px-3 py-2"
        >
          {HOW_DID_YOU_HEAR_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.howDidYouHear && (
          <span className="text-destructive text-sm">
            {errors.howDidYouHear.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground rounded px-4 py-2 font-medium hover:bg-primary/90 transition mt-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {success && (
        <div className="text-green-600 text-center font-medium">
          Thank you! We'll be in touch soon.
        </div>
      )}
    </form>
  );
}
