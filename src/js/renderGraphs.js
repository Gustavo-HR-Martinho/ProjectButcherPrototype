const dataProcessing = (data) => {
    let outputData = {
        custoOperacional: 0,
        porcentagemOperacional: 0,
        porcentagemFixo: 0,
        porcentagemVariavel: 0,
        lucro: 0,
        indiceDeSaude: 0
    }

    outputData.custoOperacional = data.custoFixo + data.custoVariavel;
    outputData.porcentagemOperacional = (outputData.custoOperacional * 100) / data.valorFaturamento;
    outputData.porcentagemFixo = (data.custoFixo * 100.0) / outputData.custoOperacional;
    outputData.porcentagemVariavel = (data.custoVariavel * 100.0) / outputData.custoOperacional;
    outputData.lucro = data.valorFaturamento - outputData.custoOperacional;
    outputData.indiceDeSaude = (outputData.lucro / data.valorFaturamento) * 100;

    return outputData;
}

export function renderGraphics(data){
    const processedData = dataProcessing(data);
    console.log(processedData)

    // Faturamento x custos graphic
    const faturamentoXcustosGraphic = {
        data: {
            labels: ['Faturamento', 'Custos'],
            series: [data.valorFaturamento, processedData.custoOperacional],
        },
        options: {
            width: 400,
            seriesBarDistance: 5,
            horizontalBars: true,
            distributeSeries: true,
            // Axis options
            axisX: {
                onlyInteger: true,
                scaleMinSpace: 45,
                showGrid: true,
                showLabel: true,
            },
            axisY: {
                offset: 90,
                showGrid: false,
            },
    
            // Plugins
            plugins: [
              Chartist.plugins.ctBarLabels({})
            ]
        }
    }
    new Chartist.Bar('.faturamentoXcustosGraphic', faturamentoXcustosGraphic.data, faturamentoXcustosGraphic.options);
    
    // Faturamento x custos graphic
    const custosGraphic = {
        data: {
            labels: ['Custo fixo', 'Custo variável'],
            series: [data.custoFixo, data.custoVariavel],
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
            },
            axisY: {
                offset: 90,
                showGrid: false,
            },
    
            // Plugins
            plugins: [
              Chartist.plugins.ctBarLabels({})
            ]
        }
    }
    new Chartist.Bar('.custosGraphic', custosGraphic.data, custosGraphic.options);

    // Analise operacioanl graphic
    const analiseOperacioanlGraphic = {
        data: {
            series: [44, 44, 55, 75]
        },
        options: {
            donut: true,
            donutWidth: 30,
            startAngle: 210,
            total: 260,
            showLabel: false,
            plugins: [
                Chartist.plugins.fillDonut({
                    items: [{
                        content: `<h3>${processedData.custoOperacional}<span class="small">%</span></h3>`
                    }]
                }),
                ctDonutMarks({
                    marks: [processedData.porcentagemOperacional * 2.2]
                })
            ],
        }
    }
    new Chartist.Pie('.analiseCustosGraphic', analiseOperacioanlGraphic.data, analiseOperacioanlGraphic.options);

    // Business health graphic
    const saudeNegocioGraphic = {
        data: {
            series: [54.5, 54.5, 54.5, 54.5]
        },
        options: {
            donut: true,
            donutWidth: 30,
            startAngle: 210,
            total: 260,
            showLabel: false,
            plugins: [
                Chartist.plugins.fillDonut({
                    items: [{
                        content: `<h3>${processedData.indiceDeSaude}<span class="small">%</span></h3>`
                    }]
                }),
                ctDonutMarks({
                    marks: [processedData.indiceDeSaude*2.2]
                })
            ],
        }
    }    
    new Chartist.Pie('.saudeGraphic', saudeNegocioGraphic.data, saudeNegocioGraphic.options);
}