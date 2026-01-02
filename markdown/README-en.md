# MikroTik

[Türkçe](/README.md)

## Table of Contents

- [Description](#description)
- [Figma Design](#figma-design)
- [Features](#features)
- [Screens](#screens)
- [Technologies](#technologies)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Development](#development)
  - [Production](#production)
- [Route Map](#route-map)

## Description

MikroTik is a control panel for managing MikroTik devices. It allows you to manage devices, users, settings, and notifications. It is a control panel that MikroTik users can use to manage their devices.

## Figma Design

- [Figma URL](https://www.figma.com/community/file/1323695683687017923)

## Features

- **User authentication**

  - `/sign-in`, `/sign-up`
  - User login, new account registration, and secure session management.

- **General landing page**

  - `/`
  - Product introduction, main explanation, and login/register guidance.

- **Dashboard – Overview**

  - `/dashboard`
  - Summary metrics related to the MikroTik infrastructure and quick status checks.

- **Firewall management**

  - `/dashboard/firewall`
  - Listing, monitoring, and managing MikroTik firewall rules.

- **RDNS status and management**

  - `/dashboard/rdns`, `/admin/rdns`, `/admin/rdns/records`
  - Monitoring RDNS status, managing global RDNS settings, and listing/updating RDNS records.

- **Device management**

  - `/dashboard/devices`
  - Listing MikroTik devices and viewing basic information.

- **User profile dashboard**

  - `/dashboard/p/:username`
  - A profile/detail page specific to each user, displaying their resources and settings.

- **Role & permission management (Admin access)**

  - `/admin`
  - A separate admin panel and overview screen for users with admin privileges.

- **User management (Admin)**

  - `/admin/users`, `/admin/users/:username`
  - Listing, filtering, paginating users, and viewing/editing details of a single user.

- **Queue (bandwidth) management**

  - `/admin/queues`, `/admin/queues/add`, `/admin/queues/:id`
  - Listing queues, creating new ones, and updating existing queues.

- **Routing – BGP management**

  - `/admin/routing/bgp`
    - Listing BGP sessions.
  - `/admin/routing/bgp/add`
    - Adding new BGP sessions.
  - `/admin/routing/bgp/update/:id`
    - Editing existing BGP sessions.
  - `/admin/routing/bgp/templates`, `/admin/routing/bgp/templates/add`, `/admin/routing/bgp/templates/update/:id`
    - Listing, creating, and updating BGP templates.
  - `/admin/routing/tables`, `/admin/routing/tables/update/:id`
    - Listing and updating routing tables.

- **IP & ARP management**

  - `/admin/ip/arp`, `/admin/ip/arp/add`, `/admin/ip/arp/update/:id`
    - Listing ARP records, adding new ones, and editing existing ARP entries.
  - `/admin/ip/addresses`, `/admin/ip/addresses/add`, `/admin/ip/addresses/update/:id`
    - Managing the IP address pool, adding new IPs, and updating existing ones.
  - `/admin/user-ips`, `/admin/user-ips/:id`
    - Listing IPs assigned to users and editing single user-IP records.

- **Category management**

  - `/admin/categories`, `/admin/categories/add`, `/admin/categories/update/:id`
    - Listing categories, adding new categories, and updating existing ones.

- **Interface & tunnel management**

  - `/admin/interfaces`
    - General overview of MikroTik interfaces.
  - `/admin/interfaces/bridge`, `/admin/interfaces/bridge/:id`
    - Creating and updating bridge interfaces.
  - `/admin/interfaces/ipip-tunnel`, `/admin/interfaces/ipip-tunnel/:id`
    - Adding IPIP tunnels and editing existing ones.
  - `/admin/interfaces/gre-tunnel`, `/admin/interfaces/gre-tunnel/:id`
    - Adding and updating GRE tunnels.

- **Role-based access control**
  - Only authorized users can access admin pages; UI visibility depends on user roles/permissions.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)

### Front-End

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

### Back-End

- [Nest.JS](https://nestjs.com/)
- [Drizzle ORM](https://drizzle.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Getting Started

### Installation

```bash
cd backend
npm i # bun, pnpm, yarn can also be used
cp .env.example .env # you need to fill in the .env file

cd frontend
npm i
cp .env.example .env.local
```

### Development

```bash
cd backend
npm run start:dev

cd frontend
npm run dev
```

### Production

```bash
cd backend
npm run build
npm run start:prod

cd frontend
npm run build
npm run start
```

## Route Map

### General

- `/`
  Main landing page of the application.

- `/sign-in`
  User login page.

- `/sign-up`
  New user registration page.

### Dashboard

- `/dashboard`
  Main dashboard page (summary/metrics).

- `/dashboard/firewall`
  Firewall rule list and management page.

- `/dashboard/rdns`
  RDNS status/summary page.

- `/dashboard/devices`
  Page where devices are listed.

- `/dashboard/p/:username`
  User-specific profile / detail dashboard page.

### Admin – General

- `/admin`
  Admin home / overview screen.

  > If the user has permission to access Admin pages, the access button will appear in the top-right corner.

- `/admin/users`
  Page where users are listed (filtering, pagination, etc.).

- `/admin/users/:username`
  Detail page of a single user.

- `/admin/queues`
  Page listing queues (e.g., bandwidth queues).

- `/admin/queues/add`
  New queue creation form.

- `/admin/queues/:id`
  Single queue detail / update page.

- `/admin/rdns`
  Page for general RDNS settings and operations.

- `/admin/rdns/records`
  RDNS records list and management page.

- `/admin/routing/bgp`
  List of BGP sessions.

- `/admin/routing/bgp/add`
  Form for adding a new BGP session.

- `/admin/routing/bgp/update/:id`
  Page for editing an existing BGP session.

- `/admin/routing/bgp/templates`
  List of BGP templates.

- `/admin/routing/bgp/templates/add`
  Form for adding a new BGP template.

- `/admin/routing/bgp/templates/update/:id`
  Page for updating an existing BGP template.

- `/admin/routing/tables`
  List of routing tables.

- `/admin/routing/tables/update/:id`
  Routing table update page.

- `/admin/ip/arp`
  List of ARP records.

- `/admin/ip/arp/add`
  Form for adding a new ARP record.

- `/admin/ip/arp/update/:id`
  Page for updating an existing ARP record.

- `/admin/ip/addresses`
  List of IP addresses.

- `/admin/ip/addresses/add`
  Form for adding a new IP address.

- `/admin/ip/addresses/update/:id`
  Page for updating an existing IP address.

- `/admin/categories`
  Page showing the list of categories.

- `/admin/categories/add`
  Form for adding a new category.

- `/admin/categories/update/:id`
  Page for editing an existing category.

- `/admin/user-ips`
  List of IPs assigned to users.

- `/admin/user-ips/:id`
  Detail / edit page for a single user-IP record.

- `/admin/interfaces`
  General overview of interfaces.

- `/admin/interfaces/bridge`
  Form for adding a new bridge interface.

- `/admin/interfaces/bridge/:id`
  Page for editing an existing bridge interface.

- `/admin/interfaces/ipip-tunnel`
  Form for adding a new IPIP tunnel.

- `/admin/interfaces/ipip-tunnel/:id`
  Page for editing an existing IPIP tunnel.

- `/admin/interfaces/gre-tunnel`
  Form for adding a new GRE tunnel.

- `/admin/interfaces/gre-tunnel/:id`
  Page for editing an existing GRE tunnel.
