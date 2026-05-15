nome: PIX Checkout Reutilizável
descricao: Skill para criar checkout de pagamento via PIX (manual ou gateway), com validação de e-mail/CPF, geração de payload JSON e UX de confirmação automática.
autor: Automações Comerciais Integradas
comandos:

comando: /gerar-payload-pix
descricao: Monta um payload JSON válido para API de cobrança PIX com defaults seguros.
parametros:
  - nome: amount
    tipo: number
    descricao: Valor da cobrança em centavos.
  - nome: expiresIn
    tipo: number
    descricao: Prazo da cobrança em dias.
  - nome: customer_name
    tipo: string
    descricao: Nome completo do cliente.
  - nome: customer_cellphone
    tipo: string
    descricao: Telefone do cliente no formato +55DDDNUMERO.
  - nome: customer_email
    tipo: string
    descricao: E-mail do cliente.
  - nome: customer_tax_id
    tipo: string
    descricao: CPF no formato XXX.XXX.XXX-XX.

comando: /gerar-checkout-pix
descricao: Gera blueprint de checkout PIX completo (frontend + backend + webhook + polling).
parametros:
  - nome: product_name
    tipo: string
    descricao: Nome do produto/oferta.
  - nome: delivery_url
    tipo: string
    descricao: URL de entrega após confirmação de pagamento.
  - nome: payment_mode
    tipo: string
    descricao: manual_pix ou gateway_pix.

# PIX Checkout Reutilizável

Use esta skill sempre que a tarefa envolver:
- venda via PIX com checkout embutido
- payload de cobrança para API externa
- fallback manual (copia e cola) sem gateway

## Regras obrigatórias

1. Nunca expor token de gateway no frontend.
2. Exigir e-mail válido antes de gerar cobrança.
3. Validar CPF no formato `XXX.XXX.XXX-XX`.
4. Retornar erros claros para:
   - e-mail inválido
   - falha ao gerar cobrança
   - cobrança expirada
5. Quando houver `brCodeBase64`, extrair corretamente com:
   `{{ $json.data.brCodeBase64.split('base64,')[1] }}`

## Prompt padrão reutilizável

Você é um assistente que cria requisições para API de pagamento PIX.  
Analise os dados recebidos e retorne JSON válido, preenchendo automaticamente campos ausentes com defaults seguros.

Campos obrigatórios:
- `amount` (centavos)
- `expiresIn` (dias)
- `description`
- `customer.name`
- `customer.cellphone` (`+55DDDNUMERO`)
- `customer.email`
- `customer.taxId` (`XXX.XXX.XXX-XX`)
- `metadata.externalId` (numérico único)

## Template JSON de saída

```json
{
  "amount": 4970,
  "expiresIn": 3,
  "description": "Pagamento PIX - Coleção Solilóquios para a Alma",
  "customer": {
    "name": "NOME_DO_CLIENTE",
    "cellphone": "+5541999999999",
    "email": "cliente@email.com",
    "taxId": "000.000.000-00"
  },
  "metadata": {
    "externalId": "20260515183001"
  }
}
```

## Blueprint técnico (checkout)

- Frontend:
  - formulário com e-mail obrigatório
  - botão `Gerar PIX e Comprar`
  - área de QR + copia e cola
  - polling de status a cada 3s
  - estado `paid` libera botão de entrega

- Backend:
  - `POST /api/create-payment`
  - `GET /api/payment-status?charge_id=...`
  - `POST /api/webhook/pix`
  - rate limit por IP
  - expiração de cobrança
  - auditoria de logs

