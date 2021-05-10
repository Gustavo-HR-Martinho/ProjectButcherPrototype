const dataProcessing = (data) => {
    let outputData = {
        porcentagemFixo: 0,
        porcentagemOperacional: 0,
        porcentagemVariavel: 0,
        custoTotal: 0,
        lucro: 0,
        indiceDeSaude: 0
    }

    outputData.custoTotal = data.custoFixo + data.custoOperacional + data.custoVariavel;
    outputData.porcentagemFixo = (data.custoFixo * 100.0) / outputData.custoTotal;
    outputData.porcentagemOperacional = (data.custoOperacional * 100.0) / outputData.custoTotal;
    outputData.porcentagemVariavel = (data.custoVariavel * 100.0) / outputData.custoTotal;
    outputData.lucro = data.valorFaturamento - outputData.custoTotal;
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
            series: [data.valorFaturamento, processedData.custoTotal],
        },
        options: {
            distributeSeries: true,
            // Axis options
            axisX: {
                showGrid: false,
            },
            axisY: {
                showLabel: false,
                showGrid: false,
                offset: 0,
            },
    
            // Plugins
            plugins: [
              Chartist.plugins.ctBarLabels({})
            ]
        }
    }
    new Chartist.Bar('.faturamentoXcustos', faturamentoXcustosGraphic.data, faturamentoXcustosGraphic.options);
    
    // Analise operacioanl graphic
    const analiseOperacioanlGraphic = {
        data: {
            series: [20, 20, 25, 35]
        },
        options: {
            donut: true,
            donutWidth: 20,
            startAngle: 270,
            showLabel: false,
            total: 200,
            plugins: [
              ctDonutMarks({
                marks: [processedData.porcentagemOperacional]
              })
            ]
        }
    }
    new Chartist.Pie('.analiseCusto', analiseOperacioanlGraphic.data, analiseOperacioanlGraphic.options);

    // Business health graphic
    const saudeData = {
        series: [25, 25, 25, 25]
    }
    
    const saudeOptions = {
        donut: true,
        donutWidth: 20,
        startAngle: 270,
        showLabel: false,
        total: 200,
        plugins: [
          ctDonutMarks({
            marks: [processedData.indiceDeSaude]
          })
        ]
    }
    
    new Chartist.Pie('.saude', saudeData, saudeOptions);

    // Custo fixo graphic
    const custoFixoGraphic = {
        data: {
            series: [160, 60]
        },
        options: {
            donut: true,
            donutWidth: 50,
            startAngle: 210,
            total: 260,
            showLabel: false,
            plugins: [
                Chartist.plugins.fillDonut({
                    items: [{
                        content: '<i class="fa fa-tachometer"></i>',
                        position: 'bottom',
                        offsetY : 10,
                        offsetX: -2
                    }, {
                        content: '<h3>160<span class="small">mph</span></h3>'
                    }]
                })
            ],
        }
    }

    new Chartist.Pie('.custoFixo', custoFixoData, custoFixoOptions);
    new Chartist.Pie('.custoOperacional', custoFixoData, custoFixoOptions);
    new Chartist.Pie('.custoVariavel', custoFixoData, custoFixoOptions);

}