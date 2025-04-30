// Tiered Financial Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize default values
    const defaultInputs = {
        // Customer distribution
        basicPercentage: 70,
        proPercentage: 20,
        enterprisePercentage: 10,
        
        // Total customers
        totalCustomers: 800,
        
        // Pricing tiers
        basicPrice: 99,
        proPrice: 199,
        enterprisePrice: 299,
        
        // Invoice sizes
        basicInvoiceSize: 7500,
        proInvoiceSize: 15000,
        enterpriseInvoiceSize: 30000,
        
        // Invoices per month
        basicInvoicesPerMonth: 1,
        proInvoicesPerMonth: 2,
        enterpriseInvoicesPerMonth: 3,
        
        // Factoring fee percentages
        basicFeePercentage: 4,
        proFeePercentage: 3.5,
        enterpriseFeePercentage: 3,
        
        // Acquisition cost
        cac: 225,
        
        // Customer lifetime (months)
        avgCustomerLifetime: 30,
    };
    
    // Set initial values for all inputs
    Object.keys(defaultInputs).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = defaultInputs[key];
        }
    });
    
    // Add event listeners to all inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', calculateFinancials);
    });
    
    // Special handling for tier percentages
    const basicPercentageInput = document.getElementById('basicPercentage');
    const proPercentageInput = document.getElementById('proPercentage');
    const enterprisePercentageInput = document.getElementById('enterprisePercentage');
    
    if (basicPercentageInput && proPercentageInput && enterprisePercentageInput) {
        [basicPercentageInput, proPercentageInput].forEach(input => {
            input.addEventListener('input', function() {
                const basicPercentage = parseFloat(basicPercentageInput.value) || 0;
                const proPercentage = parseFloat(proPercentageInput.value) || 0;
                
                // Ensure enterprise percentage makes total 100%
                const enterprisePercentage = 100 - basicPercentage - proPercentage;
                enterprisePercentageInput.value = Math.max(0, enterprisePercentage).toFixed(0);
                
                calculateFinancials();
            });
        });
    }
    
    // Run initial calculation
    calculateFinancials();
});

function calculateFinancials() {
    // Get all input values
    const inputs = {
        basicPercentage: parseFloat(document.getElementById('basicPercentage').value) || 0,
        proPercentage: parseFloat(document.getElementById('proPercentage').value) || 0,
        enterprisePercentage: parseFloat(document.getElementById('enterprisePercentage').value) || 0,
        totalCustomers: parseFloat(document.getElementById('totalCustomers').value) || 0,
        basicPrice: parseFloat(document.getElementById('basicPrice').value) || 0,
        proPrice: parseFloat(document.getElementById('proPrice').value) || 0,
        enterprisePrice: parseFloat(document.getElementById('enterprisePrice').value) || 0,
        basicInvoiceSize: parseFloat(document.getElementById('basicInvoiceSize').value) || 0,
        proInvoiceSize: parseFloat(document.getElementById('proInvoiceSize').value) || 0,
        enterpriseInvoiceSize: parseFloat(document.getElementById('enterpriseInvoiceSize').value) || 0,
        basicInvoicesPerMonth: parseFloat(document.getElementById('basicInvoicesPerMonth').value) || 0,
        proInvoicesPerMonth: parseFloat(document.getElementById('proInvoicesPerMonth').value) || 0,
        enterpriseInvoicesPerMonth: parseFloat(document.getElementById('enterpriseInvoicesPerMonth').value) || 0,
        basicFeePercentage: parseFloat(document.getElementById('basicFeePercentage').value) || 0,
        proFeePercentage: parseFloat(document.getElementById('proFeePercentage').value) || 0,
        enterpriseFeePercentage: parseFloat(document.getElementById('enterpriseFeePercentage').value) || 0,
        cac: parseFloat(document.getElementById('cac').value) || 0,
        avgCustomerLifetime: parseFloat(document.getElementById('avgCustomerLifetime').value) || 0
    };
    
    // Calculate customers per tier
    const basicCustomers = Math.round(inputs.totalCustomers * (inputs.basicPercentage / 100));
    const proCustomers = Math.round(inputs.totalCustomers * (inputs.proPercentage / 100));
    const enterpriseCustomers = Math.round(inputs.totalCustomers * (inputs.enterprisePercentage / 100));
    
    // Calculate subscription revenue
    const basicSubRevenue = basicCustomers * inputs.basicPrice;
    const proSubRevenue = proCustomers * inputs.proPrice;
    const enterpriseSubRevenue = enterpriseCustomers * inputs.enterprisePrice;
    const totalSubRevenue = basicSubRevenue + proSubRevenue + enterpriseSubRevenue;
    
    // Calculate factoring revenue
    const basicFactoringRevenue = basicCustomers * inputs.basicInvoiceSize * inputs.basicInvoicesPerMonth * (inputs.basicFeePercentage / 100);
    const proFactoringRevenue = proCustomers * inputs.proInvoiceSize * inputs.proInvoicesPerMonth * (inputs.proFeePercentage / 100);
    const enterpriseFactoringRevenue = enterpriseCustomers * inputs.enterpriseInvoiceSize * inputs.enterpriseInvoicesPerMonth * (inputs.enterpriseFeePercentage / 100);
    const totalFactoringRevenue = basicFactoringRevenue + proFactoringRevenue + enterpriseFactoringRevenue;
    
    // Calculate total transaction volume
    const monthlyVolume = (basicCustomers * inputs.basicInvoiceSize * inputs.basicInvoicesPerMonth) +
                         (proCustomers * inputs.proInvoiceSize * inputs.proInvoicesPerMonth) +
                         (enterpriseCustomers * inputs.enterpriseInvoiceSize * inputs.enterpriseInvoicesPerMonth);
    
    // Total revenue calculations
    const monthlyRevenue = totalSubRevenue + totalFactoringRevenue;
    const annualRevenue = monthlyRevenue * 12;
    
    // Profitability metrics
    const grossMargin = 0.78; // 78%
    const grossProfit = annualRevenue * grossMargin;
    
    // Customer metrics
    const avgMonthlyRevenue = monthlyRevenue / inputs.totalCustomers;
    const ltv = avgMonthlyRevenue * inputs.avgCustomerLifetime;
    const ltvCacRatio = (ltv / inputs.cac).toFixed(1);
    
    // Volume targets
    const mrrTarget = 450000;
    const volumeTarget = 1800000;
    const mrrProgress = (monthlyRevenue / mrrTarget) * 100;
    const volumeProgress = (monthlyVolume / volumeTarget) * 100;
    
    // Estimated valuation
    const estimatedValuation = annualRevenue * 6; // 6x revenue multiple
    
    // Update the results section
    const resultsElement = document.getElementById('results');
    if (resultsElement) {
        resultsElement.innerHTML = `
            <div class="space-y-6">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <div class="text-sm font-medium navy">Monthly Recurring Revenue</div>
                        <div class="text-sm font-bold text-teal">$${monthlyRevenue.toLocaleString()}</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${Math.min(mrrProgress, 100)}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">${mrrProgress.toFixed(1)}% of $450,000 target</p>
                </div>
                
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <div class="text-sm font-medium navy">Transaction Volume</div>
                        <div class="text-sm font-bold text-teal">$${monthlyVolume.toLocaleString()}</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${Math.min(volumeProgress, 100)}%"></div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">${volumeProgress.toFixed(1)}% of $1.8M target</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm font-medium navy mb-1">SaaS MRR</div>
                        <div class="text-lg font-bold text-teal">$${totalSubRevenue.toLocaleString()}</div>
                    </div>
                    <div>
                        <div class="text-sm font-medium navy mb-1">Factoring MRR</div>
                        <div class="text-lg font-bold text-teal">$${totalFactoringRevenue.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm font-medium navy mb-1">LTV:CAC Ratio</div>
                        <div class="text-lg font-bold ${parseFloat(ltvCacRatio) >= 10 ? 'text-green-500' : 'text-orange-500'}">
                            ${ltvCacRatio}:1
                        </div>
                    </div>
                    <div>
                        <div class="text-sm font-medium navy mb-1">Annual Revenue</div>
                        <div class="text-lg font-bold text-teal">$${annualRevenue.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm font-medium navy mb-1">Gross Margin</div>
                        <div class="text-lg font-bold text-green-500">${(grossMargin * 100).toFixed(0)}%</div>
                    </div>
                    <div>
                        <div class="text-sm font-medium navy mb-1">Gross Profit (Annual)</div>
                        <div class="text-lg font-bold text-teal">$${grossProfit.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm font-medium navy mb-1">Rev per Customer/mo</div>
                        <div class="text-lg font-bold text-teal">$${avgMonthlyRevenue.toFixed(2)}</div>
                    </div>
                    <div>
                        <div class="text-sm font-medium navy mb-1">Est. Valuation</div>
                        <div class="text-lg font-bold text-teal">$${estimatedValuation.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div class="text-sm font-medium navy mb-1">Basic Tier</div>
                            <div class="text-sm font-bold navy">${basicCustomers} customers</div>
                            <div class="text-xs text-gray-500">$${(basicSubRevenue + basicFactoringRevenue).toLocaleString()}/mo</div>
                        </div>
                        <div>
                            <div class="text-sm font-medium navy mb-1">Pro Tier</div>
                            <div class="text-sm font-bold navy">${proCustomers} customers</div>
                            <div class="text-xs text-gray-500">$${(proSubRevenue + proFactoringRevenue).toLocaleString()}/mo</div>
                        </div>
                        <div>
                            <div class="text-sm font-medium navy mb-1">Enterprise Tier</div>
                            <div class="text-sm font-bold navy">${enterpriseCustomers} customers</div>
                            <div class="text-xs text-gray-500">$${(enterpriseSubRevenue + enterpriseFactoringRevenue).toLocaleString()}/mo</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Update the tier comparison table with current values
    updateTierComparisonTable(inputs);
}

function updateTierComparisonTable(inputs) {
    // Update the fee percentages in the table
    const basicFeeCell = document.getElementById('basicFeeCell');
    const proFeeCell = document.getElementById('proFeeCell');
    const enterpriseFeeCell = document.getElementById('enterpriseFeeCell');
    
    if (basicFeeCell) basicFeeCell.textContent = `${inputs.basicFeePercentage}%`;
    if (proFeeCell) proFeeCell.textContent = `${inputs.proFeePercentage}%`;
    if (enterpriseFeeCell) enterpriseFeeCell.textContent = `${inputs.enterpriseFeePercentage}%`;
    
    // Update the pricing in the table headers
    const basicHeader = document.getElementById('basicHeader');
    const proHeader = document.getElementById('proHeader');
    const enterpriseHeader = document.getElementById('enterpriseHeader');
    
    if (basicHeader) basicHeader.textContent = `Basic ($${inputs.basicPrice}/mo)`;
    if (proHeader) proHeader.textContent = `Pro ($${inputs.proPrice}/mo)`;
    if (enterpriseHeader) enterpriseHeader.textContent = `Enterprise ($${inputs.enterprisePrice}/mo)`;
}
