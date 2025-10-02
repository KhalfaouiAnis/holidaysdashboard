"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePropertyLogic } from "@/hooks/use-property-logic";
import { Loader2 } from "lucide-react";
import { Bullet } from "./bullet";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export function PropertyForm({ property }: { property?: Property }) {
  const { form, handleAddProperty } = usePropertyLogic(property)
  const { control, handleSubmit, formState } = form
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(property?.amenities.split(",") || []);

  const handleAmenitiesChange = (newSelected: string[]) => {
    setSelectedAmenities(newSelected);
    const newAmenities = newSelected.join(",");
    form.setValue("amenities", newAmenities, { shouldValidate: true });
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleAddProperty, onError)} className="space-y-4 mt-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input id="name" type="text" placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea id="description" autoComplete="off" {...field} placeholder="Property description">
                </Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URLS (comma-separated)</FormLabel>
              <FormControl>
                <Textarea id="images" autoComplete="off" {...field}>
                </Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input id="capacity" type="number" {...field} min={1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="price_per_night"
            render={({ field }) => (
              <FormItem>
                <FormLabel>$/night</FormLabel>
                <FormControl>
                  <Input id="price_per_night" type="number" {...field} min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    id="country"
                    placeholder="country"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    id="city"
                    placeholder="city"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  id="address"
                  placeholder="address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2">
          <Label className="mb-2">Amenitites</Label>
          <Bullet
            selected={selectedAmenities}
            onChange={handleAmenitiesChange}
          />
        </div>
        <Button className="w-full mt-2" type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {formState.isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
