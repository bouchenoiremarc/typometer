import { measure } from "../src"
import { FontProperties } from "../src/types"
import { string } from "./constants"
import { getTextWidth } from "./helpers"

describe("measure", () => {
  const font = "italic small-caps 500 16px/2 cursive"
  const properties: FontProperties = {
    fontFamily: "cursive",
    fontSize: 16,
    fontStyle: "italic",
    fontVariant: "small-caps",
    fontWeight: 500,
    lineHeight: 2
  }

  test("should measure text", async () => {
    const { width } = await measure(string, properties)

    expect(width).toBeCloseTo(getTextWidth(string, properties), 1)
  })

  test("should measure an array of text", async () => {
    const letters = [...string]
    const metrics = await measure(letters, properties)

    letters.map((letter, index) => {
      expect(metrics[index].width).toBeCloseTo(
        getTextWidth(letter, properties),
        1
      )
    })
  })

  test("should measure text given a font string", async () => {
    const { width } = await measure(string, font)

    expect(width).toBeCloseTo(getTextWidth(string, properties), 1)
  })

  test("should measure text given a CSSStyleDeclaration", async () => {
    const element = document.createElement("span")
    element.style.setProperty("font", font)
    document.body.append(element)

    const { width } = await measure(string, window.getComputedStyle(element))

    expect(width).toBeCloseTo(getTextWidth(string, properties), 1)
  })
})
