/*
 * Gladiatus Crazy Addon Translation
 * Name : Portuguese
 * Code : PT
 * Tag  : pt-br
 * Translator(s): Gearfrity, HarveySpecter [lucasamicci@gmail.com] Led_Zeppelin, tfmvl, kelmaxine, patrick_ [glauco_freitas@hotmail.com], alansoft@gmail.com
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['pt'] = {
	
	// Language name
	name : 'Português (Brasil)',
	// Translators (authors of this script)
	translators : ["Gearfrity","HarveySpecter", "Led_Zeppelin", "tfmvl", "kelmaxine", "alansoft", "patrick_"],
	
	// Translations object
	locale : {
		// Addon info
		info : {
			description : "O mais louco add-on para gladiatus sempre!"
		},
		
		// General
		general : {
			// Days
			days : "dia(s)",
			// Minutes
			minutes : "minuto(s)",
			// Hours
			hours : "hora(s)"
			// No data
			no_data : "Não há dados",
			
			// Buttons
			confirm : "Confirmar",
			cancel : "Cancelar",
			close : "Fechar",
			error : "Erro",
			yes : "Sim",
			no : "Não",
			ok : "Ok"
		},
		
		// Global
		global : {
			// Use a life potion
			life_potion_use : "Use uma poção de vida",
			life_potion_used : "Uma poção de vida foi usada",
			life_potion_left : "Você possui {{number}} poções de vida",
			
			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Vida totalmente recuperada",
			expedition_recover_full : "Pontos de expedição totalmente recuperados",
			dungeon_recover_full : "Pontos de masmorra totalmente recuperados",
			
			// Button bar - Message
			message_private_write : "Escrever mensagem privada",
			message_guild_write : "Escrever mensagem a guilda",
			message_send : "Enviar",
			message_sent_success : "Mensagem enviada com sucesso",
			message_sent_failed : "Falha no envio da mensagem",
			message_empty : "A mensagem está vazia",
			message_exclude_me : "Excluir-me",
			
			// Button bar buttons
			guild_market_goto : "Ir para o Mercado da Aliança",
			guild_storage_goto : "Ir para o Armazém da Aliança",
			guild_bank_goto : "Ir para o Banco da Aliança",
			guild_warcamp_goto : "Ir para o Corredor do Mestre de Guerra da Aliança",
			guild_arenareports_goto : "Ir para os relatórios de batalha da arena da Aliança",
			guild_jail_goto : "Ir para o Negotium X da Aliança",
			guild_library_goto : "Ir para a Biblioteca da Aliança",
			guild_templum_goto : "Ir para o templo da Aliança",
			guild_medic_goto : "Ir para a Villa Medici da Aliança",
			simulator_goto : "Ir para o simulador",
			stats_display : "Mostrar as minhas Estatísticas",
			online_display : "Mostrar jogadores online",
			
			// Online friends
			online_friends : "Amigos Online",
			guild_friends : "Amigos da Aliança",
			family_friends : "Amigos da Família",
			
			// Guild donate
			donate_gold_confirm : "Tem certeza que deseja doar {{number}} moeda(s) de ouro?",
			donate_gold_success : "Ouro doado com sucesso",
			donate_gold_failed : "Falha na doação do ouro",
			donate_gold_no_gold : "Você não tem ouro para doar",
			donate_gold_all_gold : "Doar todo o seu ouro",
			
			// Quest timer
			quest_full : "Completa",
			quest_new : "Nova",
			
			// Pray icon
			pray_start : "Clique para começar a oração",
			pray_stop : "Clique para parar a oração",
			heal : "Curar",
			
			// Notifications
			notification_guild_application : "Há uma aplicação pendente na Aliança!",
			notification_guild_attack_ready : "O tempo de espera para batalha de alianças acabou!",
			low_durability_items : "Existem {{number}} itens com durabilidade abaixo de {{percent}}%!",
			item_worth_rubies : "Esse item vale rubis!",
			
			// Gold - Exp data
			gold_exp_data : "Informação de ouro e experiência",
			gold_exp_data_today : "Últimas 24 horas",
			gold_exp_data_week : "Últimos 7 dias",
			gold_exp_data_avg_day : "Valores médios por dia",
			gold_exp_data_to_level_up : "Dias que faltam para subir de nível",
			gold_exp_data_package_tax : "Taxa semanal de ouro armazenado",
			gold_exp_data_measurements : "Medição",
			gold_exp_data_total_exp : "Experiência total",
			gold_exp_data_total_gold : "Ouro total",
			
			// Items
			merchenary_type : "Tipo: {{name}} ({{number}})"
		},
		
		// Overview
		overview : {
			//Stats Difference
			stats_difference : "Diferença",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Arraste um item para ver o material necessário para reparo",
			workbench_6th_slot_empty : "O sexto espaço de armazenamento precisa estar vazio",
			
			// More player info
			more_player_info : "Mais informações do jogador",
			can_use_max_item_level : "Pode usar itens que sejam até nível {{max}}.",
			can_see_market_max_item_level : "Consegue visualizar no mercado itens que sejam até nível {{max}}.",
			can_see_auction_item_levels : "Consegue visualizar no leilão itens com nível de {{min}} até {{max}}."
		
		},
		
		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Abrir tudo",
			mysterybox_open_stop : "Parar",
			mysterybox_open_done : "Feito"
		},
		
		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Todo seu ouro",
			
			// Library
			library_per_point_cost : "Custo por ponto",
			library_gold_left : "Ouro da guilda após a ativação",
			
			// Medic
			medic_lost_points : "Pontos perdidos",
			medic_points_to_heal : "Pontos para curar",
			medic_life_after_heal : "Vida após a cura"
		},
		
		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% chance, entre materiais encontrados"
		},
		
		//Arena section
		arena : {
			global_arena_title : "Arena Mundial",
			global_arena_description : "Esta é a arena final, reunindo gladiadores de todos lugares do mundo! Nesta arena, os gladiadores não lutam por ouro ou experiência, eles lutam por um lugar na lista dos melhores do mundo!",
			global_arena_load : "Carregar lista de inimigos",
			global_highscore : "Classificação Mundial",
			country : "País",
			server : "Servidor",
			target_list : "Lista de alvos",
			target_list_add : "Adicionar à lista de alvos",
			target_list_remove : "Remover da lista de alvos",
			error_sth_went_wrong : "Algo deu errado",
			error_response : "O servidor respondeu com um erro",
			error_blocked_access : "Algo bloqueia o acesso ao servidor GCA ({{url}})",
			error_connection : "Erro de conexão",
			attack_player : "Clique para atacar “{{name}}”",
			fight_won : "Você venceu o combate!",
			fight_lost : "Você perdeu o combate...",
			player_tired : "Estás cansado; Necessitas esperar.",
			player1_hits_player2 : "{{name1}} acertou {{name2}}",
			player_takes_x_damage :"{{name}} fez {{number}} de dano",
			player_dies :"{{name}} morreu"
		},
		
		// Training section
		training : {
			// Points analysis
			stats_points : "pontos de status",
			points_breakdown : "Divisão dos pontos",
			stats_calculated_with_yourself_as_an_opponent : "status são calculados com o conceito de atacar a si mesmo",
			// Cost calculator
			total_cost : "Custo total",
			// Discount show
			costs_discount : "Desconto nos custos de treino"
		},
		
		// Auction section
		auction : {
			// Info
			items_info : "informação dos itens",
			// Number of items in the page
			number_of_items : "Número de itens : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Número de items licitados : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Esconda seu ouro aqui",
			// Price of item equals to its value
			price_value_function : "Preço = Valor + {{number}}",
			// Levels you can see
			levels_you_can_see : "você pode ver ítens do nível {{min}} até o nível {{max}}.",
			// Sort
			sort : "Ordenar",
			sort_by : "Ordenar por",
			sort_order : "Ordem",
			asc : "Crescente",
			desc : "Decrescente"
		},
		
		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Este item custa apenas {{number}} de ouro.",
			item_is_soulbound : "Este item é fantástico",
			item_cant_buy_back : "Você não poderá comprar de volta este item.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Você realmente quer comprar este item?",
			click_enter_to_sell : "Aperte enter ⏎ para vender"
		},
		
		// Forge
		forge : {
			forge_ended : "Fornalha terminou!",
			recraft_item : "Item reconstruido",
			show_hide_doll : "Mostrar/Esconder personagem"
		},
		
		// Merchants
		merchants : {
			search_item_in_merchants : "Procurar item nos mercadores",
			no_such_item : "O item não foi encontrado"
		},
		
		// Packages
		packages : {
			event_items : "Itens do evento",
			known_scroll : "Você conhece esse pergaminho",
			unknown_scroll : "Você não conhece este pergaminho",
			advance_filters : "Filtros avançados",
			advance_filters_apply : "Aplicar filtros",
			advance_filters_clear : "Limpar filtros",
			advance_filters_found : "(encontrrado {{items}})"
		},
		
		// Report
		reports : {
			avg_damage : "Dano médio",
			avg_heal : "Cura média",
			total_hits : "Acertos totais",
			hits : "Acertos",
			dodge : "Desviados ou bloqueados",
			points : "Pontos"
		},
		
		// Cross-Browser Sync
		sync : {
			are_you_sure : "Tem certeza que deseja entrar como o jogador {{name}}?",
			gladiatus_crazy_addon_dependency : "Você deve ter o Gladiatus Crazy Addon instalado no outro navegador.",
			how_to_sync_info : "Copie a url e cole-a no outro navegador ou digitalize o qrcode."
		},
		
		// Settings
		settings : {
			// Settings
			settings : "Configurações",
			// Description
			description : "Ativar ou desativar qualquer funcionalidade do addon que você quiser!",
			description_click_button : "Clique no botão abaixo para ir para as configurações do addon ...",
			
			// Categories
			category_global : "Definições gerais",
			category_overview : "Visão Geral",
			category_messages : "Mensagens",
			category_packages : "Pacotes",
			category_pantheon : "Pantheon",
			category_reports : "Relatórios",
			category_training : "Treinamento",
			category_merchants : "Mercadores",
			category_forge : "Forja",
			category_arena : "Arena",
			category_magus : "Mago",
			category_market : "Mercado",
			category_expedition : "Expedição",
			category_guild : "Aliança",
			category_auction : "Leilão",
			category_events : "Eventos",
			category_sound : "Som",
			category_data : "Dados",
			
			// Settings - Global
			category_global$language_select : "Alterar a linguagem do Add-on",
			category_global$sound_notifications : "Ativar notificações de som",
			category_global$browser_notifications : "Ativar notificações do navegador",
			category_global$extended_hp_xp_info : "Mostrar informação extendida de Pontos de Vida e Experiência na barra superior.",
			category_global$extended_hp_xp_info_potion : "Exibir ícone de uso de poção de vida",
			category_global$hp_timer_for_full_life : "Exibir minutos restantes para completar a vida",
			category_global$shortcuts_bar : "Mostrar barra superior de atalhos.",
			category_global$shortcuts_bar_buttons : "Selecione atalhos para a barra de atalhos",
			category_global$auction_status_bar : "Mostrar barra de estado dos leilões",
			category_global$auction_status_notification : "Alerta quando o estado do leilão mudar",
			category_global$top_fixed_bar : "Habilitar barra fixa superior",
			category_global$advance_main_menu : "Melhorar o menu principal",
			category_global$submenu_click_to_change : "Alterar o sub-menu com um clique",
			category_global$remember_tabs : "Guardar páginas da mochila e dos mercadores",
			category_global$attacked_timers : "Mostrar temporizadores em curso",
			category_global$merchants_timer : "Mostrar tempo restante dos mercadores.",
			category_global$forge_timers : "Mostrar indicador de temporizador forja / fundição",
			category_global$notify_new_guild_application : "Notifique-me quando há uma nova aplicação de alianças",
			category_global$notify_new_guild_application_interval : "Verifique as aplicações a cada (minutos)",
			category_global$x_scroll : "Ativar rolagem horizontal Gladiatus'",
			category_global$item_shadow : "Activa a sombra dos itens",
			category_global$inventory_options_group : "Opções do inventário ( grupo)",
			category_global$inventory_gold_info : "Mostrar o preço do ouro dos itens de inventário",
			category_global$pagination_layout : "Alterar o layout da página-caixa",
			category_overview$analyze_items : "Analisar os items do jogador",
			category_overview$more_statistics : "Fornecer mais estatísticas do jogador",
			category_messages$messages_layout : "Melhorar a interface de mensagens",
			category_messages$new_message_focus : "Definir o foco imediato no conteúdo",
			category_messages$new_message_friend_list : "Ativar botão lista de amigos",
			category_packages$pages_to_load : "O número máximo de páginas para carregar",
			category_packages$item_price : "Mostrar o preço dos itens",
			category_reports$style_change : "Melhorar a interface da lista de relatórios",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignore as confirmações de ataque (mais de 5 mensagens de ataques, etc.)",
			category_arena$show_simulator_imagelink : "Mostrar uma imagem-link para o simulador (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Ordenar jogadores na arena por nível",
			category_arena$highlight_guild_members : "Destacar jogadores em outros servidores que podem ser membros da aliança",
			category_arena$target_list : "Lista de jogadores alvo",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Escurecer itens que não podem ser melhorados",
			// Settings - Market
			category_market$soulbound_warning : "Confirmação de compra para itens com vínculo de alma",
			category_market$one_gold_warning : "Confirmação de compra para itens custando 1 de ouro",
			category_market$cancel_all_button : "Mostrar botão de cancelar tudo",
			category_market$remember_sell_duration : "Lembrar última duração de venda escolhida",
			category_market$sell_duration : "Selecionar duração padrão de venda",
			category_market$one_gold_mode : "Botão que altera o preço de venda para 1 de ouro sempre",
			category_market$remember_sort : "Lembrar da última ordem de ordenação",
			category_market$double_click_select : "Selecionar item com duplo clique",
			category_market$sell_warning_icons : "Ícone de aviso quando estiver vendendo itens",
			category_market$sell_with_enter : "Vender itens pressionando ENTER ⏎",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Mostrar recursos de forja que cada inimigo permite encontrar",
			category_expedition$underworld_layout : "mostrar o layout dos inimigos do inferno como na expedição",
			// Settings - Guild
			category_guild$jail_layout : "Melhorar a interface do Negotium X",
			category_guild$library_layout : "Melhorar a interface da Biblioteca",
			category_guild$library_fade_non_scrolls : "Escurecer itens que não são receitas na biblioteca",
			category_guild$library_tooltip_data : "Adicionar mais dados nas dicas da biblioteca",
			category_guild$bank_donate_layout : "Melhorar a interface do Banco",
			category_guild$bank_book_layout : "Melhorar a interface do Livro de registos do Banco",
			category_guild$bank_book_show_changes : "Mostrar variações nas doações desde a última visita no livro de registros do banco",
			category_guild$medic_layout : "Melhorar a interface da Vila Medici",
			// Settings - Auction
			category_auction$items_counters : "Exibir o número de items",
			category_auction$more_search_levels : "Mostrar mais níveis nas opções de pesquisa",
			category_auction$item_price_analyze : "Analisar preço dos itens",
			category_auction$item_level : "Mostrar o nivel dos items.",
			category_auction$x3_items_per_line : "Mostrar 3 items por linha",
			category_auction$multi_bids : "Licitar muitos itens sem atualizar a página",
			category_auction$extra_item_stats : "Exibir status extra na imagem dos itens",
			category_auction$save_last_state : "Salvar busca do leilão e carrgá-la por padrão",
			// Settings - Events
			category_events$craps_timer : "Mostrar o cronômetro do evento no topo",
			category_events$server_quest_timer : "Mostrar missão do servidor ou cronômetro da localização do evento no topo",
			// Settings - Sound
			category_sound$enabled : "Habilitar sistema de som",
			category_sound$muted : "Remover/Adicionar sons",
			category_sound$volume : "Volume dos sons",
			// Settings - Data
			category_data$export_settings : "Exportar dados de configurações pro arquivo",
			category_data$import_settings : "Importar dados de configurações do arquivo",
			category_data$reset_settings : "Reiniciar as configurações do addon",
			category_data$clear_data : "Limpar todos os dados do addon",
			category_data$clear_cache_data : "Limpar os dados de cache do addon",
			category_data$cross_browser_login : "Sincronização de login entre navegadores",
			category_data$export_error_player_settings : "Export user error's settings data to file",
			
			// Buttons
			save : "Salvar",
			export : "Exportar",
			import : "Importar",
			reset : "Reiniciar",
			clear : "Limpar",
			do_not_show : "Não mostrar",
			show_as : "Mostrar como",
			show_info : "Mostrar informação",
			each_category : "Executar na categoria escolhida",
			all_category : "Executar na categoria escolhida & todos",
			do_not_run : "Não executar",
			
			// Info
			translated_percent : "Porcentagem traduzida: {{number}}%",
			translated_by : "Traduzido por: {{string}}",
			reset_settings_confirm : "Tem certeza de que deseja redefinir as configurações do addon?",
			clear_data_confirm : "Tem certeza de que deseja limpar todos os dados do addon?",
			data_exported_save_the_file : "Os dados foram exportados. Salve o arquivo.",
			missing_translations : "Faltando traduções",
			
			// Notifications
			notification_reload : "Recarregar a página, para que as opções tenham efeito"
		}
	}
}

gca_languages._active = "pt";
