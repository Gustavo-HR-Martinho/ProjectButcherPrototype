const limitToRange = (value, min, max) => {
    const test = Math.min(Math.max(value, min), max)
    return test;
}

const dataProcessing = (data) => {
    let outputData = {
        custoOperacional: 0,
        porcentagemOperacional: 0,
        porcentagemFixo: 0,
        porcentagemVariavel: 0,
        lucro: 0,
        indiceDeSaude: 0
    }

    if (data.valorFaturamento === 0) {
        return outputData;
    }

    outputData.custoOperacional = data.custoFixo + data.custoVariavel;
    outputData.porcentagemOperacional = (outputData.custoOperacional * 100) / data.valorFaturamento;
    outputData.porcentagemFixo = (data.custoFixo * 100.0) / outputData.custoOperacional;
    outputData.porcentagemVariavel = (data.custoVariavel * 100.0) / outputData.custoOperacional;
    outputData.lucro = data.valorFaturamento - outputData.custoOperacional;
    // outputData.indiceDeSaude = ((outputData.custoOperacional + data.valorCompras) / data.valorFaturamento) * 100
    outputData.indiceDeSaude = ((data.valorFaturamento - (data.valorCompra + outputData.custoOperacional)) /  data.valorFaturamento) * 100;


    return outputData;
}

export function renderGraphics(data) {
    const processedData = dataProcessing(data);
    console.log('Data processed');
    console.log(processedData);


    // Faturamento x custos graphic
    const faturamentoXcustosGraphic = {
        data: {
            labels: ['Faturamento', 'Custos'],
            series: [{ value: data.valorFaturamento.toFixed(2), className: 'green' }, { value: processedData.custoOperacional.toFixed(2), className: 'orange' }],
        },
        options: {
            seriesBarDistance: 5,
            horizontalBars: true,
            distributeSeries: true,
            // Axis options
            axisX: {
                onlyInteger: true,
                scaleMinSpace: 45,
                showGrid: true,
                showLabel: true,
                offset: 50,
            },
            axisY: {
                offset: 90,
                showGrid: false,
            },

            // Plugins
            plugins: [
                Chartist.plugins.ctBarLabels({})
            ]
        },
        responsive: [
            ['screen and (max-width: 1024px)', {
                seriesBarDistance: 5,
                horizontalBars: false,
                distributeSeries: true,
                // Axis options
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    offset: 0,
                    onlyInteger: true,
                    scaleMinSpace: 45,
                    showGrid: true,
                    showLabel: true,
                },
            }]
        ]
    }
    new Chartist.Bar('.faturamentoXcustosGraphic', faturamentoXcustosGraphic.data, faturamentoXcustosGraphic.options, faturamentoXcustosGraphic.responsive);

    // Faturamento x custos graphic
    const custosGraphic = {
        data: {
            labels: ['Custo fixo', 'Custo variável'],
            series: [{ value: data.custoFixo.toFixed(2), className: 'green' }, { value: data.custoVariavel.toFixed(2), className: 'waterGreen' }],
        },
        options: {
            seriesBarDistance: 5,
            horizontalBars: true,
            distributeSeries: true,
            // Axis options
            axisX: {
                onlyInteger: true,
                scaleMinSpace: 45,
                showGrid: true,
                showLabel: true,
                offset: 50,
            },
            axisY: {
                offset: 90,
                showGrid: false,
            },

            // Plugins
            plugins: [
                Chartist.plugins.ctBarLabels({})
            ]
        },
        responsive: [
            ['screen and (max-width: 1024px)', {
                seriesBarDistance: 5,
                horizontalBars: false,
                distributeSeries: true,
                // Axis options
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    offset: 0,
                    onlyInteger: true,
                    scaleMinSpace: 45,
                    showGrid: true,
                    showLabel: true,
                },
            }]
        ]
    }
    new Chartist.Bar('.custosGraphic', custosGraphic.data, custosGraphic.options, custosGraphic.responsive);

    // Analise operacioanl graphic
    const analiseOperacioanlGraphic = {
        data: {
            series: [{ value: 43.6, className: 'green' }, { value: 43.6, className: 'waterGreen' }, { value: 54.5, className: 'yellow' }, { value: 76.3, className: 'orange' }]
        },
        options: {
            donut: true,
            chartPadding: 14,
            donutWidth: 50,
            startAngle: 210,
            total: 260,
            showLabel: false,
            plugins: [
                Chartist.plugins.fillDonut({
                    items: [{
                        content: `<h3>${processedData.porcentagemOperacional.toFixed(2)}<span class="small">%</span></h3>`
                    }]
                }),
                ctDonutMarks({
                    marks: [(limitToRange(processedData.porcentagemOperacional, 0, 100) * 2.18).toFixed(2)]
                })
            ],
        },
        responsive: [
            ['screen and (max-width: 1024px)', {
                donutWidth: 20,
            }]
        ]
    }
    new Chartist.Pie('.analiseCustosGraphic', analiseOperacioanlGraphic.data, analiseOperacioanlGraphic.options, analiseOperacioanlGraphic.responsive);

    // Business health graphic
    const saudeNegocioGraphic = {
        data: {
            series: [{ value: 54.5, className: 'orange' }, { value: 54.5, className: 'yellow' }, { value: 54.5, className: 'waterGreen' }, { value: 54.5, className: 'green' }]
        },
        options: {
            donut: true,
            chartPadding: 14,
            donutWidth: 50,
            startAngle: 210,
            total: 260,
            showLabel: false,
            plugins: [
                Chartist.plugins.fillDonut({
                    items: [{
                        content: `<h3>${processedData.indiceDeSaude.toFixed(2)}<span class="small">%</span></h3>`
                    }]
                }),
                ctDonutMarks({
                    marks: [((((limitToRange(processedData.indiceDeSaude, -10, 30) + 10) * 100) / 40) * 2.18).toFixed(2)]
                })
            ],
        },
        responsive: [
            ['screen and (max-width: 1024px)', {
                donutWidth: 20,
            }]
        ]
    }



    new Chartist.Pie('.saudeGraphic', saudeNegocioGraphic.data, saudeNegocioGraphic.options, saudeNegocioGraphic.responsive);
}