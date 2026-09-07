"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

const Breadcrumbnav = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean).slice(1); 

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/panel">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => (
          <Fragment key={segment}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === segments.length - 1 ? (
                <BreadcrumbPage>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={`/panel/${segments.slice(0, index + 1).join("/")}`}
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbnav;
