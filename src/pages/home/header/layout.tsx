import {
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@hope-ui/solid"
import { changeColor } from "seemly"
import { BsGridFill, BsCardImage } from "solid-icons/bs"
import { FaSolidListUl } from "solid-icons/fa"
import { Switch, Match, For } from "solid-js"
import { Dynamic } from "solid-js/web"
import { useT } from "~/hooks"
import { getMainColor, LayoutType, layout, setLayout } from "~/store"
import { createSignal } from "solid-js"

const layouts = {
  grid: BsGridFill,
  list: FaSolidListUl,
  image: BsCardImage,
} as const

export const Layout = () => {
  const t = useT()
  // const [currentLayout, setCurrentLayout] = createSignal("list")
  // const toggleLayout = () => {
  //   setCurrentLayout((prevLayout) => {
  //     if (prevLayout === "list") {
  //       return 'grid'
  //     }
  //     else if (prevLayout === "grid") {
  //       return 'image'
  //     }
  //     else {
  //       return 'list'
  //     }
  //   })
  // }

  return (
    <Menu>
      <MenuTrigger
        as={IconButton}
        color={getMainColor()}
        bgColor={changeColor(getMainColor(), { alpha: 0.15 })}
        _hover={{
          bgColor: changeColor(getMainColor(), { alpha: 0.2 }),
        }}
        aria-label="switch layout"
        compact
        size="lg"
        icon={
          <Switch>
            <Match when={layout() === "grid"}>
              <BsGridFill />
            </Match>
            <Match when={layout() === "list"}>
              <FaSolidListUl />
            </Match>
            <Match when={layout() === "image"}>
              <BsCardImage />
            </Match>
            <BsGridFill />
          </Switch>
        }
      ></MenuTrigger>
      <MenuContent>
        <For each={Object.entries(layouts)}>
          {(item) => (
            <MenuItem
              icon={<Dynamic component={item[1]} />}
              onSelect={() => {
                setLayout(item[0] as LayoutType)
              }}
            >
              {t(`home.layouts.${item[0]}`)}
            </MenuItem>
          )}
        </For>
      </MenuContent>
    </Menu>
  )
}
