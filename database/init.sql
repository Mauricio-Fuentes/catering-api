CREATE TABLE IF NOT EXISTS public."Role"(
    id serial4 NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    constraint "Role_pkey" primary key (id)
);

INSERT INTO public."Role" (name) VALUES 
('ADMIN'),
('USER'),
('TRAINER')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS public."User"(
    id serial4 NOT NULL,
    "user" text NOT NULL,
    email text NOT NULL UNIQUE,
    name text NOT NULL,
    "password" text NOT NULL,
    "role_id" int4 NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Product" (
	id serial4 NOT NULL,
	name text NOT NULL,
	quantity int4 NOT NULL,
	measure int4 NOT NULL,
    registerUserId int4 NULL,
	"registerDate" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modifyUserId int4 NULL,
	"modifyDate" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	tz_lock int4 DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT "Product_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Recipe"(
    id serial4 not null,
    description text NOT NULL,
    registerDate TIMESTAMP(3) NULL,
    modifyDate TIMESTAMP(3) NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT "Recipe_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."detailRecipe"(
    id serial4 NOT NULL,
    "recipeId" int4 NOT NULL,
    productId int4 not NULL,
    quantity int4 NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT "DetailRecipe_pkey" PRIMARY KEY (id),
    CONSTRAINT "RecipeDetail_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS public."PlantType"(
    id serial4 not null,
    description text not null,
    amount float not null,
    discount float not null,
    currency int4 not null,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT "PlanType_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."DetailPlanType"(
    id serial4 not null,
    planTypeId int4 not null,
    recipeId int4 not null,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT "DetailPlanType_pkey" PRIMARY KEY (id),
    CONSTRAINT "fk_planType" FOREIGN KEY (planTypeId) REFERENCES public."PlantType"(id),
    CONSTRAINT "fk_recipe" FOREIGN KEY (recipeId) REFERENCES public."Recipe"(id)
);

CREATE TABLE IF NOT EXISTS public."Plan"(
    id serial4 not null,
    planTypeId int4 not null,
    clientId int4 not null,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT "Plan_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Payment"(
    id serial4 NOT NULL,
	planId int4 DEFAULT(1) NOT NULL,
	"amount" float8 NOT NULL,
    currency int4 NOT NULL,
    status int4 NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	constraint "Payment_pkey" primary key (id)
);

CREATE TABLE IF NOT EXISTS public."Client"(
    id serial4 not null,
    name text not null,
    lastname text not null,
    datebirth TIMESTAMP(3) not null,
    phone text null,
    email text null,
    "address" text null,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT "Client_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Review"(
    id serial4 not null,
    clientId int4 not null,
    "weight" int4 null,
    "height" int4 null,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT "Review_pkey" PRIMARY KEY (id)
);