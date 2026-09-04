-- Dados de contato reais (mapa, endereço e canais).
--
-- O map_url anterior apontava para -16.6784792,-49.2453736 — que é a PUC Área
-- III, no Setor Leste Universitário, e não o consultório. A coordenada abaixo
-- resolve para "1478, Avenida T-4, CEP 74230-030", batendo com o endereço
-- exibido no site. O número de WhatsApp em produção ainda era o placeholder do
-- seed (+55 62 9 0000-0000).
--
-- Migration de dados: roda uma vez por banco, sem exigir reset. Canais que já
-- existem com valor correto (E-mail, Instagram) são preservados.
DO $$
DECLARE
  v_info_id     uuid;
  v_channel_id  uuid;
  v_map_url  text := 'https://maps.google.com/maps?q=-16.71971902331966,-49.2668878132625&z=17&output=embed';
  v_phone    text := '(62) 9 8252-3582';
  v_next     integer;
BEGIN
  SELECT id INTO v_info_id FROM contact_info ORDER BY created_at LIMIT 1;

  IF v_info_id IS NULL THEN
    INSERT INTO contact_info DEFAULT VALUES RETURNING id INTO v_info_id;
  END IF;

  UPDATE contact_info SET
    map_url      = v_map_url,
    address_line = 'Av. T-4, 1478 — Sala 172-B',
    neighborhood = 'Setor Bueno',
    city_state   = 'Goiânia – GO',
    postal_code  = '74230-030',
    updated_at   = now()
  WHERE id = v_info_id;

  -- E-mail e Instagram: só criados se ainda não existirem, nunca sobrescritos.
  INSERT INTO contact_channels (contact_info_id, label, icon_key, value, sort_order)
  SELECT v_info_id, 'E-mail', 'mail', 'contato@thaisdantas.com.br', 0
  WHERE NOT EXISTS (
    SELECT 1 FROM contact_channels WHERE contact_info_id = v_info_id AND label = 'E-mail'
  );

  INSERT INTO contact_channels (contact_info_id, label, icon_key, value, sort_order)
  SELECT v_info_id, 'Instagram', 'instagram', 'https://instagram.com/thaisdantas', 3
  WHERE NOT EXISTS (
    SELECT 1 FROM contact_channels WHERE contact_info_id = v_info_id AND label = 'Instagram'
  );

  -- Telefone e WhatsApp: valor real substitui o placeholder do seed.
  UPDATE contact_channels
  SET value = v_phone, icon_key = 'phone', updated_at = now()
  WHERE contact_info_id = v_info_id AND label = 'Telefone';

  INSERT INTO contact_channels (contact_info_id, label, icon_key, value, sort_order)
  SELECT v_info_id, 'Telefone', 'phone', v_phone, 1
  WHERE NOT EXISTS (
    SELECT 1 FROM contact_channels WHERE contact_info_id = v_info_id AND label = 'Telefone'
  );

  UPDATE contact_channels
  SET value = v_phone, icon_key = 'message-circle', updated_at = now()
  WHERE contact_info_id = v_info_id AND label = 'WhatsApp';

  INSERT INTO contact_channels (contact_info_id, label, icon_key, value, sort_order)
  SELECT v_info_id, 'WhatsApp', 'message-circle', v_phone, 2
  WHERE NOT EXISTS (
    SELECT 1 FROM contact_channels WHERE contact_info_id = v_info_id AND label = 'WhatsApp'
  );

  -- Ordem de exibição: E-mail, Telefone, WhatsApp, Instagram; demais canais depois.
  UPDATE contact_channels SET sort_order = 0 WHERE contact_info_id = v_info_id AND label = 'E-mail';
  UPDATE contact_channels SET sort_order = 1 WHERE contact_info_id = v_info_id AND label = 'Telefone';
  UPDATE contact_channels SET sort_order = 2 WHERE contact_info_id = v_info_id AND label = 'WhatsApp';
  UPDATE contact_channels SET sort_order = 3 WHERE contact_info_id = v_info_id AND label = 'Instagram';

  v_next := 4;
  FOR v_channel_id IN
    SELECT id FROM contact_channels
    WHERE contact_info_id = v_info_id
      AND label NOT IN ('E-mail', 'Telefone', 'WhatsApp', 'Instagram')
    ORDER BY sort_order, created_at
  LOOP
    UPDATE contact_channels SET sort_order = v_next WHERE id = v_channel_id;
    v_next := v_next + 1;
  END LOOP;
END $$;
