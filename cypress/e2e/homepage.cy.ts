/// <reference types="cypress" />

describe("Test homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should fill input elements, select cities, increase number of passengers and submit the form", () => {
    const PARIS = "Paris";
    const MARSEILLE = "Marseille";

    cy.get("input").eq(0).type(PARIS);
    cy.contains("li", PARIS).click();

    cy.get("input").eq(1).type(MARSEILLE);
    cy.contains("li", MARSEILLE).click();

    cy.contains("button", "+").click();
    cy.contains("button", "Submit").click();

    cy.url()
      .should("include", `name=${PARIS}`)
      .and("include", `name=${MARSEILLE}`)
      .and("include", "latitude")
      .and("include", "date")
      .and("include", "passengers=2");
  });
});
