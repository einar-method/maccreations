export function checkLowerNavBtns() {
  const toHomeBtn = document.getElementById("toHomeBtn");
  const toPortfolioBtn = document.getElementById("toPortfolioBtn");
  const toMerchBtn = document.getElementById("toMerchBtn");
  const toBlogBtn = document.getElementById("toBlogBtn");

  if (toHomeBtn) {
    document.getElementById("toHomeBtn").addEventListener("click", function() {
        document.getElementById("homeBtn").click();
      });
  };
  if (toPortfolioBtn) {
    document.getElementById("toPortfolioBtn").addEventListener("click", function() {
        document.getElementById("portfolioBtn").click();
      });
  };
  if (toMerchBtn) {
    document.getElementById("toMerchBtn").addEventListener("click", function() {
        document.getElementById("merchBtn").click();
      });
  };
  if (toBlogBtn) {
    document.getElementById("toBlogBtn").addEventListener("click", function() {
        document.getElementById("blogBtn").click();
      });
  };
};