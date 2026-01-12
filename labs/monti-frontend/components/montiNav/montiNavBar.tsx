"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, ListItem } from '../ui/navigation-menu'
import Link from 'next/link'
import { useIsMobile } from "@/hooks/use-mobile"

export default function MontiNavBar() {
  // const isMobile = useIsMobile();
  return (
    // <NavigationMenu viewport={isMobile}>
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Studien</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      Studien Übersicht
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Erstelle und überblicke all deine Studien an einem Ort.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="">
                    <div className="text-sm leading-none font-medium">Erstelle eine Studie</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      Starte eine neue Studie, um wertvolle Einblicke zu gewinnen.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                <Link href="">
                  <div className="text-sm leading-none font-medium">Besondere Studien</div>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    Studie von VIPs :P.
                  </p>
                </Link>
              </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Teilnehmer</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      Teilnehmer Übersicht
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Alle deine Teilnehmer an einem Ort.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="">
                    <div className="text-sm leading-none font-medium">Füge einen neuen Teilnehmer hinzu</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      Füge einen neuen Teilnehmer zu einer Studie hinzu.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                <Link href="">
                  <div className="text-sm leading-none font-medium">Armbänder</div>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    Armbänder verwalten und zuordnen.
                  </p>
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="">
                  <div className="text-sm leading-none font-medium">Mobile App</div>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    Übersicht zur Appstatus und versionen.
                  </p>
                </Link>
              </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Fragebögen</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="">
                    <div className="text-sm leading-none font-medium">Überblick</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      Bereits erstellte Fragebogen im überblick und bearbeiten.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                <Link href="">
                  <div className="text-sm leading-none font-medium">Erstellen</div>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    Neue Fragebögen Erstellen
                  </p>
                </Link>
              </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList >
    </NavigationMenu >
  )
}
