/*
 * Addon News Surveys Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_news_surveys = {
	inject : function(){
		if(!$dark('#content'))
			return;
		
		this.GCA_News_tab();
	},
	GCA_News_tab : function(){
		$dark('#mainnav tr[0]').addChild(
			$dark('*td').id('GCA_News_Tab').addChild(
				$dark('*a').class('awesome-tabs').css('cursor:pointer;').html('GCA '+$dark('#mainnav td[0] a[0]').html() ).click( function(){gca_section_news_surveys.show_GCA_News();} ).addChild(
					$dark('*div').class('navBG')
				)
			)
		);
	},
	show_GCA_News : function(){
		$dark('#mainnav .current[0]').addChild($dark('*div').class('navBG'));
		$dark('#mainnav .current[0]').class('awesome-tabs');
		$dark('#GCA_News_Tab a[0]').class('awesome-tabs current');
		while($dark('#GCA_News_Tab .navBG').length){
			$dark('#GCA_News_Tab .navBG[0]').remove();
		}
		$dark('#content').html('');
		$dark('#content').addChild(
			$dark('*div').class('contentItem').addChild([
				$dark('*h3').html('GCA '+$dark('#mainnav td[0] a[0]').html() ),
				$dark('*div').class('contentItem_content').html('<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FGladiatusCrazyAddOn&amp;width=500&amp;height=500&amp;show_faces=false&amp;colorscheme=light&amp;stream=true&amp;show_border=false&amp;header=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:500px;" allowTransparency="true"></iframe>')
			])
		);
		
	}
}