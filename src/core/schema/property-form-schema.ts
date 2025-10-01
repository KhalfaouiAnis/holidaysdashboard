import z from "zod";

export const PropertyFormSchema = z.object({
  name: z.string({ message: "Name is required" }),
  description: z.string({ message: "Description is required" }),
  price_per_night: z.coerce.number(),
  address: z.string({ message: "Address is required" }),
  city: z.string({ message: "City is required" }),
  country: z.string({ message: "Country is required" }),
  capacity: z.coerce.number(),
  images: z
    .string()
    .min(1, { message: "At least one image URL is required" })
    .transform((val) => val.split(",").map((url) => url.trim()))
    .pipe(
      z.array(z.string().url({ message: "Invalid URL" })).nonempty({
        message: "At least one image URL is required",
      }),
    ),
  amenities: z.optional(z.string()),
  longitude: z.optional(z.coerce.number()),
  latitude: z.optional(z.coerce.number()),
  longitude_delta: z.optional(z.coerce.number()),
  latitude_delta: z.optional(z.coerce.number()),
  is_featured: z.optional(z.boolean()),
});

export type PropertyFormType = z.infer<typeof PropertyFormSchema>;

export type PropertyFormInput = Omit<PropertyFormType, "images"> & {
  images: string;
};

export const PropertyFormDefaultValues: PropertyFormInput = {
  name: "",
  description: "",
  price_per_night: 0,
  address: "",
  city: "",
  country: "",
  capacity: 0,
  images: "",
  amenities: "",
  longitude: 0,
  latitude: 0,
  longitude_delta: 0,
  latitude_delta: 0,
  is_featured: false,
};
