package config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 리액트에서 "/upload/~~~" 로 이미지를 요청하면
        registry.addResourceHandler("/upload/**")
                // 실제 컴퓨터의 "C:/upload/" 폴더 안에서 찾아서 응답
                .addResourceLocations("file:///C:/upload/");
    }
}
