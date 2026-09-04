ALTER TABLE "contact_info" ADD COLUMN "address_line" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_info" ADD COLUMN "neighborhood" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_info" ADD COLUMN "city_state" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_info" ADD COLUMN "postal_code" text DEFAULT '' NOT NULL;